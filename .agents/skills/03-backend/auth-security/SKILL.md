---
name: auth-security
description: Implement authentication, authorization and application security correctly (sessions, JWT, OAuth2/OIDC, RBAC, OWASP Top 10, secrets). Use this skill whenever the user builds login/signup, roles/permissions, tokens, password reset, API keys, or asks to secure or review an app for vulnerabilities.
---

# Auth & Security

## Authentication
- Passwords: argon2id/bcrypt, min length 12, breach check optional, rate-limit + lockout, never log.
- Web apps: **httpOnly, Secure, SameSite** cookie sessions are simplest and safest. SPAs/mobile: short-lived access JWT (5–15 min) + rotating refresh token stored securely (Keychain/Keystore, httpOnly cookie).
- Prefer a provider (Auth0, Clerk, Supabase, Firebase, Keycloak) over rolling your own.
- Social login: OAuth2 Authorization Code + **PKCE**; verify `state`/`nonce`.
- MFA (TOTP/WebAuthn passkeys) for sensitive apps. Email verification + safe password reset (single-use, expiring token).

## Authorization
Deny by default. Check **on the server, per object** (prevent IDOR: `WHERE id=? AND owner_id=?`). RBAC for roles, ABAC/policies for rules. Never trust client-provided role/user IDs.

## OWASP Top 10 checklist
- [ ] Injection: parameterized queries, ORM, no string-built SQL/shell
- [ ] XSS: output encoding, CSP, sanitize rich text
- [ ] CSRF: tokens or SameSite for cookie auth
- [ ] SSRF: allow-list outbound URLs
- [ ] Broken access control tests
- [ ] Security headers (HSTS, CSP, X-Content-Type-Options)
- [ ] Dependency scanning (`npm audit`, `pip-audit`, Dependabot)
- [ ] Rate limiting & bot protection on auth endpoints
- [ ] Audit logs for sensitive actions

## Secrets
Env vars/secret manager (never git); rotate; separate per environment; `gitleaks`/GitHub secret scanning in CI. Encrypt PII at rest; TLS everywhere.
