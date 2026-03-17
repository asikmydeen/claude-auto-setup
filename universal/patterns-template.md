# Codebase Patterns: {PROJECT_NAME}
> Auto-extracted by pattern-analyzer. Last updated: {DATE}.
> Regenerate: run /init or /deep-research. DO NOT edit manually — changes will be overwritten.

## How to Use This File
- Read this BEFORE implementing any changes in this codebase
- Follow every pattern EXACTLY unless you have a justified reason to deviate
- To deviate: propose the change, explain why, get user confirmation FIRST
- After confirmed deviation: update this file + log in Deviation Log below

---

## File Organization

**Directory structure rules:**
{DIRECTORY_RULES}

**File naming conventions:**
| Type | Convention | Example |
|------|-----------|---------|
| {TYPE_1} | {CONVENTION_1} | {EXAMPLE_1} |

**Where new files go:**
{NEW_FILE_PLACEMENT}

---

## Module Structure

**Export pattern:**
```{LANG}
{EXPORT_PATTERN_EXAMPLE}
```

**Dependency injection / initialization:**
```{LANG}
{INIT_PATTERN_EXAMPLE}
```

**Module boundary rules:**
{MODULE_BOUNDARY_RULES}

---

## Function & Method Signatures

**Standard function pattern:**
```{LANG}
{FUNCTION_PATTERN_EXAMPLE}
```

**Async handling:**
{ASYNC_PATTERN}

**Return conventions:**
{RETURN_CONVENTIONS}

---

## Component Patterns
> Skip this section if the project has no UI layer.

**Component structure:**
```{LANG}
{COMPONENT_PATTERN_EXAMPLE}
```

**Props interface pattern:**
```{LANG}
{PROPS_PATTERN_EXAMPLE}
```

**Hook usage:**
{HOOK_PATTERNS}

**Styling approach:**
{STYLING_APPROACH}

---

## Route / Handler Patterns
> Skip this section if the project has no API layer.

**Route definition:**
```{LANG}
{ROUTE_PATTERN_EXAMPLE}
```

**Handler signature:**
```{LANG}
{HANDLER_PATTERN_EXAMPLE}
```

**Validation:**
{VALIDATION_PATTERN}

**Response format:**
{RESPONSE_PATTERN}

---

## Type Definitions

**Type naming & structure:**
```{LANG}
{TYPE_PATTERN_EXAMPLE}
```

**Where types live:**
{TYPE_LOCATION_RULES}

**Shared vs colocated:**
{SHARED_VS_COLOCATED}

---

## Import Conventions

**Import ordering:**
```{LANG}
{IMPORT_ORDER_EXAMPLE}
```

**Path resolution:**
{PATH_RESOLUTION} (relative / absolute / aliases)

**Barrel files:**
{BARREL_FILE_USAGE}

---

## Error Handling

**Standard error pattern:**
```{LANG}
{ERROR_HANDLING_EXAMPLE}
```

**Error at boundaries:**
{BOUNDARY_ERROR_PATTERN}

**Logging on error:**
{ERROR_LOGGING_PATTERN}

---

## Testing Patterns

**Test file naming:** {TEST_FILE_NAMING}

**Test structure:**
```{LANG}
{TEST_STRUCTURE_EXAMPLE}
```

**Mock patterns:**
```{LANG}
{MOCK_PATTERN_EXAMPLE}
```

**Assertion style:**
{ASSERTION_STYLE}

---

## Logging & Observability

**Logger usage:**
{LOGGER_PATTERN}

**Log context inclusion:**
{LOG_CONTEXT_PATTERN}

---

## Configuration

**Environment variable access:**
{ENV_ACCESS_PATTERN}

**Config file pattern:**
{CONFIG_FILE_PATTERN}

---

## Naming Conventions

| Context | Convention | Example |
|---------|-----------|---------|
| Variables | {VAR_CONVENTION} | {VAR_EXAMPLE} |
| Functions | {FUNC_CONVENTION} | {FUNC_EXAMPLE} |
| Types/Interfaces | {TYPE_CONVENTION} | {TYPE_EXAMPLE} |
| Files | {FILE_CONVENTION} | {FILE_EXAMPLE} |
| Constants | {CONST_CONVENTION} | {CONST_EXAMPLE} |
| Directories | {DIR_CONVENTION} | {DIR_EXAMPLE} |

---

## Anti-Patterns (DO NOT)

{ANTI_PATTERNS_LIST}

---

## Deviation Log

| Date | Pattern | Change | Reason | Approved |
|------|---------|--------|--------|----------|
| | | | | |
