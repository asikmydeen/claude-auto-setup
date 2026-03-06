# Security Standards

## OWASP Top 10 Awareness
- Validate and sanitize all user input at API boundaries
- Use parameterized queries — never string-concatenate SQL/DynamoDB expressions
- Implement proper authentication and session management
- Never expose stack traces or internal errors to users
- Set appropriate CORS headers — never use wildcard in production

## Secrets Management
- Never hardcode secrets, API keys, tokens, or passwords
- Use AWS Secrets Manager or Parameter Store for secrets
- Never log secrets — redact sensitive fields in logs
- Rotate credentials regularly
- Add `.env*`, `secrets/`, `credentials*` to `.gitignore`

## IAM and Access Control
- Least privilege — grant minimum permissions needed
- Use IAM roles for services, not long-lived access keys
- Scope Lambda execution roles to specific resources
- Review and audit permissions regularly

## Dependency Security
- Keep dependencies updated — check for known vulnerabilities
- Use `npm audit` or equivalent to scan for CVEs
- Pin dependency versions in production
- Review new dependencies before adding (check maintainer, popularity, license)

## Data Protection
- Encrypt data at rest (S3 SSE, DynamoDB encryption, RDS encryption)
- Use HTTPS/TLS for all data in transit
- Classify data sensitivity — handle PII with extra care
- Implement proper data retention and deletion policies
