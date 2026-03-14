# Add Resource

Ingest external documentation, repositories, or web resources into the OpenViking context database for semantic search and agent access.

## Usage
```
/add-resource <url-or-path> [--type docs|repo|api|guide]
```

## Behavior

1. **Check OpenViking availability**
   - Run `ov status` to verify server is running
   - If not available, fall back to manual instructions

2. **Ingest the resource**
   ```bash
   ov add-resource <url-or-path>
   ```

3. **Verify ingestion**
   ```bash
   ov ls viking://resources/ -L 2
   ```

4. **Report** what was added, its URI, and how to search it

## Examples

```bash
# Add API documentation
/add-resource https://docs.example.com/api/v2

# Add a GitHub repository
/add-resource https://github.com/org/repo

# Add local documentation
/add-resource ./docs/architecture.md
```

## Fallback (No OpenViking)

If OpenViking is not installed:
1. Suggest using `context7` for library docs: `resolve-library-id` → `query-docs`
2. For project-specific docs, suggest adding key info to `project-intel.md`
3. Print install instructions:
   ```
   pip install openviking
   openviking-server --config ~/.openviking/config.yaml
   ```

## Notes
- Resources are automatically processed into L0/L1/L2 layers
- Large resources may take a few seconds to index
- Use `ov find "query"` to search ingested resources
- Use `ov tree viking://resources/ -L 3` to see the full hierarchy
