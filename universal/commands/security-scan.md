---
name: security-scan
description: Run comprehensive security audit on codebase
category: quality
complexity: medium
triggers: [security-scan, audit-security, owasp-check]
---

# Security Scan

Run a comprehensive security audit of the current project. Combines automated tooling with agent-driven code review.

## Input
Target scope: $ARGUMENTS (default: entire project)

## Execution

### Phase 1: Detect Project Stack

Detect project languages and identify:
- Package manager (npm, pip, cargo, go, composer, bundler)
- Dependency files (package-lock.json, requirements.txt, Cargo.lock, go.sum)
- Framework (Express, Django, Rails, Spring, etc.)

### Phase 2: Dependency Audit

Run the appropriate audit command for detected languages:
- **TypeScript/JS**: `npm audit --json` or `yarn audit --json`
- **Python**: `pip audit` or `safety check`
- **Rust**: `cargo audit`
- **Go**: `govulncheck ./...`
- **PHP**: `composer audit`
- **Java**: `mvn dependency-check:check` (if plugin configured)
- **Ruby**: `bundle audit`

Parse output and collect: CVE ID, severity, affected package, fix version.

### Phase 3: Secret Detection

Scan for hardcoded secrets using regex patterns:
- API keys: `(sk-|pk-|api[_-]?key|apikey)\s*[=:]\s*['"][A-Za-z0-9]{20,}`
- AWS credentials: `AKIA[0-9A-Z]{16}`
- Tokens: `(token|secret|password|passwd)\s*[=:]\s*['"][^\s'"]{8,}`
- Private keys: `-----BEGIN (RSA |EC |)PRIVATE KEY-----`
- Connection strings: `(mongodb|postgres|mysql|redis):\/\/[^\s]+`

Exclude: `.env.example`, test fixtures, docs, `vendor/`, `node_modules/`.

### Phase 4: Code Review (Agent)

Spawn security-auditor agent with focused scope:
```
Agent(subagent_type="security-auditor", prompt="Review the project for OWASP Top 10:
1. Injection (SQL, NoSQL, command, LDAP)
2. Broken auth (session management, credential storage)
3. Sensitive data exposure (logging, error messages, headers)
4. XXE (XML parsing)
5. Broken access control (IDOR, privilege escalation)
6. Security misconfiguration (CORS, headers, defaults)
7. XSS (reflected, stored, DOM-based)
8. Insecure deserialization
9. Known vulnerable components (from Phase 2)
10. Insufficient logging/monitoring
Report findings with severity, file:line, and fix recommendation.")
```

### Phase 5: Report

Output structured report:

```
## Security Scan Report — {project_name}
Date: {date}

### Summary
- Critical: N | High: N | Medium: N | Low: N | Info: N

### Dependency Vulnerabilities
| Package | CVE | Severity | Fix Version |
|---------|-----|----------|-------------|

### Hardcoded Secrets
| File:Line | Type | Action Required |
|-----------|------|-----------------|

### Code Review Findings
| File:Line | Category | Severity | Description | Fix |
|-----------|----------|----------|-------------|-----|

### Recommendations
1. Prioritized list of fixes by severity
```
