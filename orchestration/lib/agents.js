import { execFileSync, execFile } from 'child_process';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

function cmuxCmd() {
  // Check for the non-interactive wrapper binary first (installed by install.sh)
  const wrapperPath = join(homedir(), '.local', 'bin', 'cmux');
  if (existsSync(wrapperPath)) return wrapperPath;

  // Fallback: check PATH (may find wrapper or other install location)
  try {
    const p = execFileSync('which', ['cmux'], { stdio: 'pipe' }).toString().trim();
    // Verify it's an actual binary/script, not a shell function path
    if (p && existsSync(p)) return p;
  } catch { /* not found in PATH */ }

  return null;
}

function getCwd() {
  // Try to detect the project root from git
  try {
    return execFileSync('git', ['rev-parse', '--show-toplevel'], { stdio: 'pipe' }).toString().trim();
  } catch {
    return process.cwd();
  }
}

export function spawnAgent({ branch, prompt, background }) {
  const cmux = cmuxCmd();
  if (!cmux) {
    return { error: 'cmux not installed. Run install.sh to set it up.' };
  }

  const cwd = getCwd();
  const safeBranch = branch || `agent-${Date.now()}`;

  try {
    // Create worktree + branch via cmux wrapper (non-interactive, no claude launch)
    execFileSync(cmux, ['new', safeBranch], {
      cwd,
      stdio: 'pipe',
      timeout: 30000,
    });

    // Derive worktree path using cmux convention: .worktrees/<sanitized-branch>
    const worktreePath = join(cwd, '.worktrees', safeBranch.replace(/\//g, '-'));

    if (prompt) {
      // Launch Claude in the worktree with the prompt
      const args = ['-p', prompt, '--dangerously-skip-permissions'];

      if (background) {
        // Fire and forget — agent works independently
        const child = execFile('claude', args, {
          cwd: worktreePath,
          timeout: 600000, // 10 min max
          maxBuffer: 5 * 1024 * 1024,
          env: { ...process.env, CLAUDECODE: undefined },
        }, (error, stdout) => {
          // Write result to a marker file
          const resultFile = join(worktreePath, '.agent-result.md');
          const fs = require('fs');
          const content = error
            ? `# Agent Failed\n\n${error.message}\n\n## Partial Output\n${stdout || ''}`
            : `# Agent Complete\n\n${stdout}`;
          try { fs.writeFileSync(resultFile, content); } catch { /* ignore */ }
        });
        child.unref();

        return {
          branch: safeBranch,
          worktree: worktreePath,
          status: 'running',
          message: `Agent spawned in background on branch "${safeBranch}"`,
        };
      }

      // Synchronous — wait for result
      const result = execFileSync('claude', args, {
        cwd: worktreePath,
        timeout: 600000,
        maxBuffer: 5 * 1024 * 1024,
        env: { ...process.env, CLAUDECODE: undefined },
      }).toString();

      return {
        branch: safeBranch,
        worktree: worktreePath,
        status: 'completed',
        result: result.slice(0, 5000),
      };
    }

    return {
      branch: safeBranch,
      worktree: worktreePath,
      status: 'ready',
      message: `Worktree created. Use "cmux start ${safeBranch}" to launch Claude there.`,
    };
  } catch (err) {
    return { error: `Failed to spawn agent: ${err.message}` };
  }
}

export function listAgents() {
  const cwd = getCwd();
  const worktreesDir = join(cwd, '.worktrees');

  if (!existsSync(worktreesDir)) {
    return { agents: [], message: 'No active agent worktrees' };
  }

  const entries = readdirSync(worktreesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const wpath = join(worktreesDir, d.name);
      const hasResult = existsSync(join(wpath, '.agent-result.md'));
      let lastCommit = null;
      try {
        lastCommit = execFileSync('git', ['log', '-1', '--format=%s (%ar)', d.name], {
          cwd,
          stdio: 'pipe',
          timeout: 5000,
        }).toString().trim();
      } catch { /* ignore */ }

      return {
        branch: d.name,
        path: wpath,
        has_result: hasResult,
        status: hasResult ? 'completed' : 'active',
        last_commit: lastCommit,
      };
    });

  return { agents: entries, count: entries.length };
}

export function agentStatus({ branch }) {
  const cwd = getCwd();
  const safeBranch = (branch || '').replace(/\//g, '-');
  const worktreePath = join(cwd, '.worktrees', safeBranch);

  if (!existsSync(worktreePath)) {
    return { error: `No worktree found for branch: ${branch}` };
  }

  const resultFile = join(worktreePath, '.agent-result.md');
  const hasResult = existsSync(resultFile);

  let result = null;
  if (hasResult) {
    try { result = readFileSync(resultFile, 'utf8').slice(0, 5000); } catch { /* ignore */ }
  }

  let commits = [];
  try {
    const log = execFileSync('git', ['log', '--oneline', '-10', safeBranch], {
      cwd,
      stdio: 'pipe',
      timeout: 5000,
    }).toString().trim();
    commits = log.split('\n').filter(Boolean);
  } catch { /* ignore */ }

  let diffStat = null;
  try {
    diffStat = execFileSync('git', ['diff', '--stat', `HEAD...${safeBranch}`], {
      cwd,
      stdio: 'pipe',
      timeout: 5000,
    }).toString().trim();
  } catch { /* ignore */ }

  return {
    branch: safeBranch,
    path: worktreePath,
    status: hasResult ? 'completed' : 'active',
    result,
    recent_commits: commits,
    diff_stat: diffStat,
  };
}

export function mergeAgent({ branch }) {
  const cmux = cmuxCmd();
  const cwd = getCwd();
  const safeBranch = (branch || '').replace(/\//g, '-');

  if (!safeBranch) {
    return { error: 'Branch name required' };
  }

  try {
    if (cmux) {
      const output = execFileSync(cmux, ['merge', safeBranch], {
        cwd,
        stdio: 'pipe',
        timeout: 30000,
      }).toString();
      return { merged: true, branch: safeBranch, output };
    }

    // Fallback: manual git merge
    const output = execFileSync('git', ['merge', safeBranch, '--no-edit'], {
      cwd,
      stdio: 'pipe',
      timeout: 30000,
    }).toString();
    return { merged: true, branch: safeBranch, output };
  } catch (err) {
    return { error: `Merge failed: ${err.message}`, branch: safeBranch };
  }
}

export function removeAgent({ branch }) {
  const cmux = cmuxCmd();
  const cwd = getCwd();
  const safeBranch = (branch || '').replace(/\//g, '-');

  if (!safeBranch) {
    return { error: 'Branch name required' };
  }

  try {
    if (cmux) {
      execFileSync(cmux, ['rm', safeBranch], {
        cwd,
        stdio: 'pipe',
        timeout: 15000,
      });
    } else {
      // Manual cleanup
      execFileSync('git', ['worktree', 'remove', safeBranch, '--force'], {
        cwd,
        stdio: 'pipe',
        timeout: 15000,
      });
      try {
        execFileSync('git', ['branch', '-D', safeBranch], { cwd, stdio: 'pipe', timeout: 5000 });
      } catch { /* branch may already be gone */ }
    }
    return { removed: true, branch: safeBranch };
  } catch (err) {
    return { error: `Remove failed: ${err.message}` };
  }
}
