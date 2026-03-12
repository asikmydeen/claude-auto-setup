# Universal AI Agent Setup — Makefile
.PHONY: install update self-update uninstall dry-run test lint clean version help

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Fresh install (auto-detect agents)
	./install.sh

update: ## Update commands/rules only (preserves settings)
	./install.sh --update

self-update: ## Git pull latest + update
	./install.sh --self-update

uninstall: ## Remove all installed config
	./install.sh --uninstall

dry-run: ## Preview changes without making them
	./install.sh --dry-run

test: ## Run smoke tests
	./tests/run.sh

lint: ## Lint shell scripts with shellcheck (errors only)
	@command -v shellcheck >/dev/null 2>&1 || { echo "shellcheck not installed"; exit 1; }
	shellcheck -S error install.sh dispatch.sh project-init.sh orchestration-intel.sh lib/common.sh

lint-warn: ## Lint with warnings (not just errors)
	@command -v shellcheck >/dev/null 2>&1 || { echo "shellcheck not installed"; exit 1; }
	shellcheck -S warning install.sh dispatch.sh project-init.sh orchestration-intel.sh lib/common.sh

clean: ## Remove stale worktrees
	@for wt in $$(git worktree list --porcelain | grep '^worktree ' | grep -v "$$(pwd)$$" | sed 's/^worktree //'); do \
		echo "Removing worktree: $$wt"; \
		git worktree remove "$$wt" 2>/dev/null || true; \
	done
	@echo "Pruning stale worktree refs..."
	@git worktree prune

version: ## Show version
	./install.sh --version
