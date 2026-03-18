# Fleet Agent Container — API-Key Providers Only
# Browser-auth CLIs (Kiro, Amp) run LOCALLY via hybrid dispatch.
# Credentials injected at runtime via env-file — NEVER baked into this image.

FROM node:22-slim

# System deps
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      git curl jq ca-certificates unzip python3 && \
    rm -rf /var/lib/apt/lists/*

# --- API-Key CLI Providers (work with env var injection) ---

# Claude Code (Anthropic) — primary agent, reasoning, planning, debugging
RUN npm install -g @anthropic-ai/claude-code

# Codex CLI (OpenAI) — fast code gen, tests, boilerplate
RUN npm install -g @openai/codex || true

# Gemini CLI (Google) — docs, large context, frontend
RUN npm install -g @google/gemini-cli || true

# Copilot CLI (GitHub) — PR/issues, git ops, CI/CD (uses GH_TOKEN env var)
RUN npm install -g @github/copilot 2>/dev/null || true

# --- NOT installed (browser-auth — run locally instead) ---
# Kiro CLI   — uses `kiro auth` (browser OAuth), runs locally via hybrid dispatch
# Amp Code   — uses `amp login` (browser OAuth), runs locally via hybrid dispatch

# Bun runtime (for TypeScript tools)
RUN curl -fsSL https://bun.sh/install | bash

# Non-root user (Claude Code blocks --dangerously-skip-permissions as root)
RUN useradd -m -s /bin/bash fleet && \
    mkdir -p /project /output && \
    chown fleet:fleet /project /output
# Copy bun to fleet user
RUN cp -r /root/.bun /home/fleet/.bun && chown -R fleet:fleet /home/fleet/.bun

USER fleet
ENV PATH="/home/fleet/.bun/bin:/usr/local/bin:/usr/bin:/bin"
WORKDIR /project

# No default entrypoint — command selected at runtime based on provider
ENTRYPOINT []
CMD ["claude", "-p", "--help"]
