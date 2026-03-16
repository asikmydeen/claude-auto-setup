/**
 * Integration routes: GitHub, Supabase, AWS.
 * Extracted from server/index.ts (lines ~2410-2872).
 */
import { Router } from "express";
import { existsSync, readFileSync } from "fs";
import { join, resolve } from "path";
import { execFileSync } from "child_process";
import {
  loadIntegrations,
  saveIntegrations,
  maskSecret,
  HOME,
} from "../lib/shared";

const router = Router();

/**
 * Context injected by the parent server for mutable state
 * that lives in index.ts (activeProject, userProjects).
 */
export interface IntegrationsContext {
  getActiveProject: () => string;
  setActiveProject: (path: string) => void;
  getUserProjects: () => Array<{ path: string; name: string; addedAt: string }>;
}

let ctx: IntegrationsContext;

/** Call once at startup to wire up mutable state from index.ts. */
export function initIntegrationsContext(context: IntegrationsContext) {
  ctx = context;
}

// ============================================================
// INTEGRATIONS — GITHUB
// ============================================================

router.get("/api/integrations/github", (_req, res) => {
  const config = loadIntegrations();
  if (!config.github?.pat) {
    return res.json({ connected: false });
  }
  res.json({
    connected: true,
    username: config.github.username,
    pat: maskSecret(config.github.pat),
    connectedAt: config.github.connectedAt,
  });
});

router.put("/api/integrations/github", async (req, res) => {
  const { pat } = req.body;
  if (!pat || typeof pat !== "string") {
    return res.status(400).json({ error: "PAT is required" });
  }

  // Validate PAT by calling GitHub API
  try {
    const resp = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${pat.trim()}`, "User-Agent": "claude-auto-setup" },
    });
    if (!resp.ok) return res.status(401).json({ error: "Invalid PAT — GitHub returned " + resp.status });

    const user = (await resp.json()) as { login: string };
    const config = loadIntegrations();
    config.github = { pat: pat.trim(), username: user.login, connectedAt: new Date().toISOString() };
    saveIntegrations(config);

    res.json({ connected: true, username: user.login });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Connection failed";
    res.status(500).json({ error: msg });
  }
});

router.delete("/api/integrations/github", (_req, res) => {
  const config = loadIntegrations();
  delete config.github;
  saveIntegrations(config);
  res.json({ ok: true });
});

router.post("/api/integrations/github/verify", async (_req, res) => {
  const config = loadIntegrations();
  if (!config.github?.pat) return res.json({ ok: false, error: "Not connected" });

  try {
    const resp = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${config.github.pat}`, "User-Agent": "claude-auto-setup" },
    });
    if (!resp.ok) return res.json({ ok: false, error: `GitHub API returned ${resp.status}` });

    const user = (await resp.json()) as { login: string; name: string | null; public_repos: number; created_at: string };
    // Also check rate limit
    const rateResp = await fetch("https://api.github.com/rate_limit", {
      headers: { Authorization: `Bearer ${config.github.pat}`, "User-Agent": "claude-auto-setup" },
    });
    const rate = rateResp.ok ? (await rateResp.json()) as { rate: { limit: number; remaining: number; reset: number } } : null;

    res.json({
      ok: true,
      user: { login: user.login, name: user.name, repos: user.public_repos, since: user.created_at },
      rateLimit: rate ? { limit: rate.rate.limit, remaining: rate.rate.remaining, resetsAt: new Date(rate.rate.reset * 1000).toISOString() } : null,
      scopes: resp.headers.get("x-oauth-scopes") || "unknown",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Verification failed";
    res.json({ ok: false, error: msg });
  }
});

router.get("/api/integrations/github/repos", async (_req, res) => {
  const config = loadIntegrations();
  if (!config.github?.pat) return res.status(401).json({ error: "GitHub not connected" });

  try {
    const resp = await fetch("https://api.github.com/user/repos?sort=updated&per_page=30", {
      headers: { Authorization: `Bearer ${config.github.pat}`, "User-Agent": "claude-auto-setup" },
    });
    if (!resp.ok) return res.status(resp.status).json({ error: "GitHub API error" });

    const repos = (await resp.json()) as Array<{ name: string; full_name: string; html_url: string; clone_url: string; description: string | null; private: boolean; language: string | null; updated_at: string }>;
    res.json(repos.map(r => ({
      name: r.name,
      fullName: r.full_name,
      url: r.html_url,
      cloneUrl: r.clone_url,
      description: r.description,
      private: r.private,
      language: r.language,
      updatedAt: r.updated_at,
    })));
  } catch {
    res.status(500).json({ error: "Failed to fetch repos" });
  }
});

router.post("/api/integrations/github/clone", (req, res) => {
  const { repoUrl, targetPath } = req.body;
  const config = loadIntegrations();
  if (!config.github?.pat) return res.status(401).json({ error: "GitHub not connected" });
  if (!repoUrl) return res.status(400).json({ error: "repoUrl is required" });

  // Validate URL format — only allow github.com HTTPS URLs
  const ghUrlPattern = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+(?:\.git)?$/;
  if (!ghUrlPattern.test(repoUrl)) {
    return res.status(400).json({ error: "Invalid GitHub repository URL. Only https://github.com/ URLs are allowed." });
  }

  const rawDest = targetPath || join(HOME, "projects", repoUrl.split("/").pop()?.replace(".git", "") || "repo");
  const dest = resolve(rawDest);
  // Prevent path traversal — must be under home or /tmp
  if (!dest.startsWith(HOME) && !dest.startsWith("/tmp")) {
    return res.status(400).json({ error: "Target path must be under home directory" });
  }

  try {
    // Use git credential helper via env to avoid embedding PAT in the URL
    const cloneEnv = {
      ...process.env,
      GIT_ASKPASS: "echo",
      GIT_TERMINAL_PROMPT: "0",
      GIT_CONFIG_COUNT: "1",
      GIT_CONFIG_KEY_0: "http.https://github.com/.extraheader",
      GIT_CONFIG_VALUE_0: `Authorization: Bearer ${config.github.pat}`,
    };
    execFileSync("git", ["clone", repoUrl, dest], { encoding: "utf-8", timeout: 120000, env: cloneEnv });

    // Add as project
    ctx.setActiveProject(dest);
    const userProjects = ctx.getUserProjects();
    if (!userProjects.some((p) => p.path === dest)) {
      userProjects.push({ path: dest, name: dest.split("/").pop() || "repo", addedAt: new Date().toISOString() });
    }

    res.json({ ok: true, path: dest });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Clone failed";
    res.status(500).json({ error: msg });
  }
});

// ============================================================
// INTEGRATIONS — SUPABASE
// ============================================================

// Status — returns connected state + project info
router.get("/api/integrations/supabase", (_req, res) => {
  const config = loadIntegrations();
  if (!config.supabase?.accessToken) return res.json({ connected: false });

  res.json({
    connected: true,
    url: config.supabase.url,
    anonKey: maskSecret(config.supabase.anonKey),
    projectRef: config.supabase.projectRef,
    projectName: config.supabase.projectName,
    orgName: config.supabase.orgName,
    connectedAt: config.supabase.connectedAt,
  });
});

// Sign in with access token — validates and fetches projects
router.put("/api/integrations/supabase", async (req, res) => {
  const { accessToken } = req.body;
  if (!accessToken || typeof accessToken !== "string") {
    return res.status(400).json({ error: "Access token is required" });
  }

  const sbApi = "https://api.supabase.com";
  const headers = { Authorization: `Bearer ${accessToken.trim()}`, "Content-Type": "application/json" };

  try {
    // Validate token by listing projects
    const resp = await fetch(`${sbApi}/v1/projects`, { headers });
    if (!resp.ok) return res.status(401).json({ error: `Invalid token — Supabase returned ${resp.status}` });

    const projects = (await resp.json()) as Array<{
      id: string; name: string; organization_id: string;
      region: string; status: string; created_at: string;
    }>;

    // Save token, return project list for user to pick
    const config = loadIntegrations();
    config.supabase = {
      accessToken: accessToken.trim(),
      url: "", anonKey: "",
      connectedAt: new Date().toISOString(),
    };
    saveIntegrations(config);

    res.json({ connected: true, projects });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Connection failed";
    res.status(500).json({ error: msg });
  }
});

// Select a project — fetches API keys and stores them
router.post("/api/integrations/supabase/select-project", async (req, res) => {
  const { projectRef } = req.body;
  if (!projectRef) return res.status(400).json({ error: "projectRef is required" });

  const config = loadIntegrations();
  if (!config.supabase?.accessToken) return res.status(401).json({ error: "Not authenticated" });

  const sbApi = "https://api.supabase.com";
  const headers = { Authorization: `Bearer ${config.supabase.accessToken}`, "Content-Type": "application/json" };

  try {
    // Fetch API keys for this project
    const keysResp = await fetch(`${sbApi}/v1/projects/${projectRef}/api-keys`, { headers });
    if (!keysResp.ok) return res.status(keysResp.status).json({ error: `Failed to fetch keys: ${keysResp.status}` });

    const keys = (await keysResp.json()) as Array<{ name: string; api_key: string }>;
    const anonKey = keys.find(k => k.name === "anon")?.api_key || "";
    const serviceKey = keys.find(k => k.name === "service_role")?.api_key || "";

    // Fetch project details for the URL
    const projResp = await fetch(`${sbApi}/v1/projects/${projectRef}`, { headers });
    const proj = projResp.ok ? (await projResp.json()) as { name: string; region: string; organization_id: string } : null;

    // Fetch org name
    let orgName = "";
    if (proj?.organization_id) {
      try {
        const orgResp = await fetch(`${sbApi}/v1/organizations`, { headers });
        if (orgResp.ok) {
          const orgs = (await orgResp.json()) as Array<{ id: string; name: string }>;
          orgName = orgs.find(o => o.id === proj.organization_id)?.name || "";
        }
      } catch {}
    }

    const url = `https://${projectRef}.supabase.co`;

    config.supabase = {
      ...config.supabase,
      url,
      anonKey,
      serviceRoleKey: serviceKey,
      projectRef,
      projectName: proj?.name || projectRef,
      orgName,
    };
    saveIntegrations(config);

    res.json({ ok: true, url, projectName: proj?.name, orgName, hasAnonKey: !!anonKey, hasServiceKey: !!serviceKey });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to select project";
    res.status(500).json({ error: msg });
  }
});

// List projects (for authenticated users)
router.get("/api/integrations/supabase/projects", async (_req, res) => {
  const config = loadIntegrations();
  if (!config.supabase?.accessToken) return res.status(401).json({ error: "Not authenticated" });

  const headers = { Authorization: `Bearer ${config.supabase.accessToken}`, "Content-Type": "application/json" };
  try {
    const resp = await fetch("https://api.supabase.com/v1/projects", { headers });
    if (!resp.ok) return res.status(resp.status).json({ error: "Failed to fetch projects" });
    const projects = await resp.json();
    res.json(projects);
  } catch {
    res.status(500).json({ error: "Failed to list projects" });
  }
});

router.delete("/api/integrations/supabase", (_req, res) => {
  const config = loadIntegrations();
  delete config.supabase;
  saveIntegrations(config);
  res.json({ ok: true });
});

// Test connection to the selected project
router.post("/api/integrations/supabase/test", async (_req, res) => {
  const config = loadIntegrations();
  if (!config.supabase?.url || !config.supabase?.anonKey) return res.status(400).json({ error: "No project selected" });

  try {
    const resp = await fetch(`${config.supabase.url.replace(/\/$/, "")}/rest/v1/`, {
      headers: { apikey: config.supabase.anonKey, Authorization: `Bearer ${config.supabase.anonKey}` },
    });
    res.json({ ok: resp.ok, status: resp.status });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Connection test failed";
    res.json({ ok: false, error: msg });
  }
});

// ============================================================
// INTEGRATIONS — AWS
// ============================================================

router.get("/api/integrations/aws", (_req, res) => {
  const config = loadIntegrations();
  const profiles: string[] = [];

  // Parse ~/.aws/credentials for profile names
  const credsPath = join(HOME, ".aws/credentials");
  const configPath = join(HOME, ".aws/config");

  try {
    if (existsSync(credsPath)) {
      const content = readFileSync(credsPath, "utf-8");
      const matches = content.match(/\[([^\]]+)\]/g);
      if (matches) profiles.push(...matches.map(m => m.replace(/[[\]]/g, "")));
    }
    if (existsSync(configPath)) {
      const content = readFileSync(configPath, "utf-8");
      const matches = content.match(/\[profile ([^\]]+)\]/g);
      if (matches) profiles.push(...matches.map(m => m.replace(/\[profile |\]/g, "")));
    }
  } catch {}

  // Deduplicate
  const uniqueProfiles = [...new Set(profiles)];

  // Check for ada CLI
  let hasAda = false;
  try { execFileSync("which", ["ada"], { encoding: "utf-8" }); hasAda = true; } catch {}

  // Check for aws CLI
  let hasAwsCli = false;
  try { execFileSync("which", ["aws"], { encoding: "utf-8" }); hasAwsCli = true; } catch {}

  res.json({
    profiles: uniqueProfiles,
    activeProfile: config.aws?.activeProfile || "default",
    adaAccount: config.aws?.adaAccount,
    adaRole: config.aws?.adaRole,
    hasAda,
    hasAwsCli,
  });
});

router.put("/api/integrations/aws/profile", (req, res) => {
  const { profile, adaAccount, adaRole } = req.body;
  const config = loadIntegrations();
  config.aws = {
    activeProfile: profile || config.aws?.activeProfile,
    adaAccount: adaAccount || config.aws?.adaAccount,
    adaRole: adaRole || config.aws?.adaRole,
  };
  saveIntegrations(config);
  res.json({ ok: true, ...config.aws });
});

router.post("/api/integrations/aws/refresh-credentials", (req, res) => {
  const config = loadIntegrations();
  const { account, role, profile } = req.body;

  const adaAccount = account || config.aws?.adaAccount;
  const adaRole = role || config.aws?.adaRole || "Admin";
  const adaProfile = profile || config.aws?.activeProfile || "default";

  if (!adaAccount) return res.status(400).json({ error: "AWS account ID is required" });

  try {
    const output = execFileSync("ada", [
      "credentials", "update",
      "--account", adaAccount,
      "--role", adaRole,
      "--once",
      "--profile", adaProfile,
    ], { encoding: "utf-8", timeout: 30000 });

    // Save the account/role for future refreshes
    config.aws = { ...config.aws, activeProfile: adaProfile, adaAccount, adaRole };
    saveIntegrations(config);

    res.json({ ok: true, output: output.trim(), profile: adaProfile });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "ada credentials update failed";
    res.status(500).json({ error: msg });
  }
});

router.post("/api/integrations/aws/verify", (_req, res) => {
  const config = loadIntegrations();
  const profile = config.aws?.activeProfile || "default";

  try {
    // Check if aws CLI exists
    execFileSync("which", ["aws"], { encoding: "utf-8" });
  } catch {
    return res.json({ ok: false, error: "AWS CLI not installed" });
  }

  try {
    const output = execFileSync("aws", ["sts", "get-caller-identity", "--profile", profile, "--output", "json"], {
      encoding: "utf-8",
      timeout: 15000,
      env: { ...process.env, AWS_PROFILE: profile },
    });
    const identity = JSON.parse(output) as { Account: string; Arn: string; UserId: string };

    // Also check what region is configured
    let region = "unknown";
    try {
      region = execFileSync("aws", ["configure", "get", "region", "--profile", profile], {
        encoding: "utf-8", timeout: 5000,
      }).trim() || "unknown";
    } catch {}

    res.json({
      ok: true,
      account: identity.Account,
      arn: identity.Arn,
      userId: identity.UserId,
      profile,
      region,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "AWS verification failed";
    // Check for common errors
    if (msg.includes("ExpiredToken") || msg.includes("expired")) {
      return res.json({ ok: false, error: "Credentials expired — refresh with ada", expired: true });
    }
    if (msg.includes("could not be found") || msg.includes("NoCredentialProviders")) {
      return res.json({ ok: false, error: `No credentials for profile "${profile}"` });
    }
    res.json({ ok: false, error: msg.slice(0, 300) });
  }
});

router.post("/api/integrations/aws/exec", (req, res) => {
  const { command, args: cmdArgs = [] } = req.body;
  if (!command) return res.status(400).json({ error: "command is required" });

  const config = loadIntegrations();
  const profile = config.aws?.activeProfile || "default";

  // Only allow aws CLI commands for safety
  if (command !== "aws") return res.status(400).json({ error: "Only 'aws' commands are allowed" });

  // Validate args - no shell injection
  // Strict arg validation — only allow safe characters (alphanumeric, hyphens, dots, slashes, colons, equals, underscores)
  const SAFE_ARG = /^[a-zA-Z0-9_\-.:=/,@*\s]+$/;
  const safeArgs = (cmdArgs as string[]).filter(a => typeof a === "string" && SAFE_ARG.test(a));

  try {
    const output = execFileSync("aws", [...safeArgs, "--profile", profile, "--output", "json"], {
      encoding: "utf-8",
      timeout: 30000,
      env: { ...process.env, AWS_PROFILE: profile },
    });
    res.json({ ok: true, output: output.trim() });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "AWS command failed";
    res.status(500).json({ error: msg });
  }
});

export default router;
