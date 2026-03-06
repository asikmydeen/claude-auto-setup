# AWS Development Patterns

## Brazil Build System
- Always use `brazil-build` for builds, not raw npm/webpack
- Common targets: `release`, `build`, `test`, `install`
- Run npm scripts via: `brazil-build run <script-name>`
- Check `packageInfo` for workspace and version set config

## AWS Services
- Use AWS SDK v3 (modular imports), never v2
- Always use IAM least privilege — scope permissions to exactly what's needed
- Use environment variables or AWS Secrets Manager for config, never hardcode
- Prefer managed services (Lambda, DynamoDB, S3) over self-managed infrastructure

## Lambda Best Practices
- Keep handlers thin — extract business logic into separate modules
- Set appropriate memory and timeout values
- Use structured logging (JSON) for CloudWatch
- Cold start optimization: minimize dependencies, use lazy initialization
- Always handle partial failures in batch operations

## CDK / Infrastructure
- Use L2 constructs over L1 when available
- Tag all resources with team, project, and environment
- Use separate stacks for stateful (DB, S3) vs stateless (Lambda, API GW) resources
- Never hardcode account IDs or regions — use `Aws.ACCOUNT_ID`, `Aws.REGION`

## Authentication
- Use ADA for credential management: `ada credentials update --account=<id> --provider=isengard --role=<role> --once`
- Refresh credentials before any deploy or AWS API call
- Never commit AWS credentials or tokens
