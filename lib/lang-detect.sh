#!/usr/bin/env bash
# Language detection for project-scoped rule activation
# Source this from project-init.sh or other scripts
# Compatible with Bash 3.2+ (no associative arrays)

detect_project_languages() {
  local dir="${1:-.}"
  local langs=""

  # TypeScript / JavaScript
  if [ -f "$dir/tsconfig.json" ] || [ -f "$dir/package.json" ]; then
    langs="$langs typescript"
  fi

  # Python
  if [ -f "$dir/requirements.txt" ] || [ -f "$dir/pyproject.toml" ] || [ -f "$dir/setup.py" ] || [ -f "$dir/Pipfile" ]; then
    langs="$langs python"
  fi

  # Go
  if [ -f "$dir/go.mod" ]; then
    langs="$langs go"
  fi

  # Rust
  if [ -f "$dir/Cargo.toml" ]; then
    langs="$langs rust"
  fi

  # Swift
  if [ -f "$dir/Package.swift" ]; then
    langs="$langs swift"
  fi

  # PHP
  if [ -f "$dir/composer.json" ]; then
    langs="$langs php"
  fi

  # Java
  if [ -f "$dir/pom.xml" ] || [ -f "$dir/build.gradle" ]; then
    langs="$langs java"
  fi

  # Kotlin
  if [ -f "$dir/build.gradle.kts" ]; then
    langs="$langs kotlin"
  fi

  # C++
  if [ -f "$dir/CMakeLists.txt" ]; then
    langs="$langs cpp"
  fi

  # Perl
  if [ -f "$dir/Makefile.PL" ] || [ -f "$dir/cpanfile" ]; then
    langs="$langs perl"
  fi

  # Trim leading space
  echo "$langs" | sed 's/^ //'
}

# Activate language rules for a project directory
# Usage: activate_language_rules /path/to/project
# Returns: space-separated list of activated languages
activate_language_rules() {
  local project_dir="${1:-.}"
  local rules_staging="$HOME/.claude/rules/lang"
  local detected
  detected=$(detect_project_languages "$project_dir")

  if [ -z "$detected" ]; then
    return 0
  fi

  mkdir -p "$project_dir/.claude/rules"
  for lang in $detected; do
    local rule_file="$rules_staging/lang-${lang}.md"
    if [ -f "$rule_file" ]; then
      ln -sf "$rule_file" "$project_dir/.claude/rules/lang-${lang}.md" 2>/dev/null || \
        \cp -f "$rule_file" "$project_dir/.claude/rules/lang-${lang}.md"
    fi
  done
  echo "$detected"
}
