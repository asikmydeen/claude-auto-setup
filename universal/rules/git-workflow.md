# Git Workflow

## Commit Messages
- Format: `<type>: <short description>` (e.g., `feat: add user auth endpoint`)
- Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`
- Keep subject under 72 characters
- Use body for "why", not "what" — the diff shows "what"

## Branch Naming
- Feature: `feat/<short-description>`
- Bugfix: `fix/<short-description>`
- Use kebab-case, keep it short and descriptive

## PR Conventions
- Keep PRs focused — one feature or fix per PR
- Include summary and test plan in PR description
- Self-review diff before requesting review
- Address all review comments before merging

## Safety
- Never force-push to main/mainline
- Never commit `.env`, credentials, or large binaries
- Review `git diff` before committing
- Stage specific files, not `git add -A`
