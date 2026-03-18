// SDLC Overseer — Kiro CLI Consultation Module
// Provides internal context by querying kiro-cli for internal code search,
// documentation, ticketing, and AWS patterns.

import { spawnSync } from "child_process";
import { existsSync } from "fs";

const KIRO_CLI = "kiro-cli";

/**
 * Check if kiro-cli is installed and available.
 */
export function isKiroAvailable(): boolean {
  try {
    const result = spawnSync("which", [KIRO_CLI], { encoding: "utf-8", timeout: 5000 });
    return result.status === 0 && result.stdout.trim().length > 0;
  } catch {
    return false;
  }
}

/**
 * Query Kiro CLI with a prompt. Returns the text response.
 * Used as a consultation sidecar — Claude agents query Kiro for internal context.
 */
export function consultKiro(question: string, cwd?: string, timeoutMs = 120000): string {
  if (!isKiroAvailable()) return "[kiro-cli not available]";

  try {
    const result = spawnSync(KIRO_CLI, ["-p", question, "--allow-tool=shell(read)", "--output-format", "text"], {
      cwd: cwd || process.cwd(),
      encoding: "utf-8",
      timeout: timeoutMs,
      env: {
        ...process.env,
        CLAUDECODE: "",
        CLAUDE_CODE_ENTRYPOINT: "",
      },
      stdio: ["ignore", "pipe", "pipe"],
    });

    if (result.status === 0 && result.stdout) {
      return result.stdout.trim();
    }
    return result.stderr?.trim() || "[kiro consultation returned no output]";
  } catch (err) {
    return `[kiro consultation error: ${err instanceof Error ? err.message : String(err)}]`;
  }
}

/**
 * Detect if a project is internal (Amazon/AWS) based on project markers.
 */
export function detectInternalProject(projectRoot: string): { isInternal: boolean; indicators: string[] } {
  const indicators: string[] = [];

  // Brazil workspace markers
  if (existsSync(`${projectRoot}/packageInfo`)) indicators.push("packageInfo (Brazil)");
  if (existsSync(`${projectRoot}/Config`)) indicators.push("Config directory (Brazil)");
  if (existsSync(`${projectRoot}/.brazil.json`)) indicators.push(".brazil.json");

  // CDK / CloudFormation markers
  if (existsSync(`${projectRoot}/cdk.json`)) indicators.push("cdk.json");
  if (existsSync(`${projectRoot}/template.yaml`)) indicators.push("template.yaml (SAM)");

  // Internal path markers
  const isInWorkplace = projectRoot.includes("/workplace/") || projectRoot.includes("/brazil-pkg-cache/");
  if (isInWorkplace) indicators.push("workplace directory");

  return {
    isInternal: indicators.length > 0,
    indicators,
  };
}

/**
 * Build internal context instructions to inject into agent prompts.
 * This is the core of the Kiro integration — it tells Claude agents HOW to use Kiro.
 */
export function buildInternalContext(_projectRoot: string): string {
  if (!isKiroAvailable()) return "";

  return `
## Internal Development Mode (Kiro-Assisted)

This is an INTERNAL project. You have access to Kiro CLI for internal context.

### How to Consult Kiro
Before making architectural decisions, choosing internal APIs, or implementing service integrations, consult Kiro:

\`\`\`bash
kiro-cli -p "your question here" --allow-tool='shell(read)'
\`\`\`

### When to Consult Kiro (MANDATORY for internal)
1. **Before choosing internal APIs/services**: "What internal service handles [X]? What's the API?"
2. **Before writing CDK/infrastructure**: "What's the CDK pattern for [X] in our org?"
3. **Before implementing auth/authz**: "How does authentication work for internal services?"
4. **Before deployment setup**: "What pipeline template should I use for [X]?"
5. **When referencing internal docs**: "Search internal docs for [topic]"
6. **When looking up existing code**: "Search internal code for [pattern/service]"
7. **When checking tickets/requirements**: "Read ticket [SIM/TT ID]"

### Kiro's Internal Tools
Kiro has access to tools you don't:
- **InternalCodeSearch** — search Amazon internal codebases
- **InternalSearch** — search internal wikis, documentation
- **ReadInternalWebsites** — read internal dashboards, wikis, design docs
- **TicketingReadActions** — read SIM tickets, TT tickets
- **WorkspaceSearch** — search Brazil workspace packages
- **aws-documentation-mcp** — AWS service documentation

### Internal Development Standards
- Build system: \`brazil-build release\` (not npm/bun)
- Test: \`brazil-build run test\`
- Packages: Use internal versions when available (search Kiro first)
- Deployment: CloudFormation/CDK through pipelines (never direct deploy)
- Security: Follow internal security review requirements
- Code review: CR required before merge (not PR)

### Pattern: Consult → Implement → Verify
For every major decision:
1. Ask Kiro: "What's the internal standard for [X]?"
2. Implement following the response
3. Verify: "Does this implementation follow internal patterns for [X]?"
`;
}

/**
 * Build internal routing preferences for the spawner.
 * When internal, certain task types should prefer kiro-cli.
 */
export function getInternalRouting(): Record<string, string[]> {
  return {
    frontend: ["claude", "codex"],       // Claude for internal FE (needs patterns)
    backend: ["kiro", "claude"],          // Kiro first for internal APIs
    api: ["kiro", "claude"],              // Kiro knows internal API patterns
    test: ["claude", "codex"],            // Claude/Codex for tests
    docs: ["kiro", "claude"],             // Kiro for internal documentation
    infra: ["kiro", "claude"],            // Kiro for CDK/CloudFormation
    devops: ["kiro", "claude"],           // Kiro for pipelines
    security: ["kiro", "claude"],         // Kiro for internal security patterns
    design: ["claude"],                   // Claude for design
  };
}
