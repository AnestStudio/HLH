---
name: spring-security
description: >
  Configure and review Spring Security authentication, authorization, password
  handling, sessions, CSRF, CORS, and role-based access control in Spring applications.
  Use when implementing login, registration, access rules, or security filters.
---

# Spring Security Guidelines

## Version and project inspection
- Inspect the Spring Boot and Spring Security versions before writing configuration.
- For modern Spring Security, prefer a `SecurityFilterChain` bean and component-based configuration; do not introduce deprecated `WebSecurityConfigurerAdapter` patterns.
- Use `jakarta.servlet` APIs in Jakarta-based projects and match the project's actual APIs.
- Preserve the project's authentication mechanism unless the task explicitly changes it.

## Authentication
- Use a `PasswordEncoder` such as `BCryptPasswordEncoder` or a suitable delegating encoder. Never store plaintext passwords or reversible encrypted passwords.
- Authenticate using a configured `UserDetailsService`, `AuthenticationProvider`, or an established identity provider.
- Keep `UserDetails` account flags aligned with the domain model: enabled, account non-expired, account non-locked, and credentials non-expired.
- Use generic login failure messages where revealing whether a username/email exists would enable account enumeration.
- Implement rate limiting or progressive throttling for repeated login failures where the application needs it.
- Keep password reset and account activation tokens random, single-purpose, time-limited, and stored safely. Avoid logging tokens.
- Do not invent a custom authentication scheme when Spring Security already provides the required mechanism.

## Authorization
- Deny by default and explicitly define public routes, authenticated routes, and role/authority rules.
- Distinguish roles from authorities consistently. Remember that `hasRole("ADMIN")` conventionally checks for `ROLE_ADMIN`; do not accidentally pass a `ROLE_` prefix to `hasRole`.
- Enforce access control at the HTTP layer and, for sensitive business operations, at the service/method layer using method security where appropriate.
- Do not trust role, user ID, owner ID, or permission values supplied by the client. Derive identity from the authenticated principal and validate resource ownership server-side.
- Protect administrative endpoints and object-level operations against IDOR/BOLA vulnerabilities.
- Avoid granting broad access with `permitAll()` or wildcard matchers merely to fix an error. Check matcher order because the first matching rule wins.

## Sessions, CSRF, CORS, and cookies
- Keep CSRF protection enabled for browser-based session/cookie authentication. Disable it only for a justified architecture such as a stateless API with appropriate compensating controls, not as a generic fix.
- CORS is not an authentication or authorization mechanism. Configure explicit trusted origins, methods, and headers; avoid wildcard origins with credentials.
- Choose session creation policy intentionally. Do not set stateless mode when the application relies on server sessions or form login.
- Use secure cookie attributes in HTTPS deployments: `Secure`, `HttpOnly`, and an appropriate `SameSite` policy.
- Configure session fixation protection, logout behavior, and session invalidation appropriately.
- Do not store secrets or sensitive user information in client-readable tokens. If JWT is used, validate signature, issuer, audience, expiration, and allowed algorithms.

## Passwords, secrets, and responses
- Never log passwords, raw tokens, session IDs, or authorization headers.
- Do not expose internal stack traces or account details in authentication responses.
- Keep secrets outside source control and use environment-specific secret management.
- Apply validation to registration, password changes, activation, and reset flows.
- Use HTTPS in deployed environments; do not weaken TLS verification.

## Implementation and tests
- Configure request matchers in a clear, least-privilege order.
- Keep custom filters narrowly scoped and ensure they run at the correct point in the chain.
- Avoid unnecessary custom filters that duplicate built-in features.
- Test unauthenticated access, authenticated access, role boundaries, CSRF behavior, logout, and ownership checks.
- Include negative tests proving users cannot access other users' resources or admin-only endpoints.
- Explain any security trade-off and never claim a configuration is secure merely because it compiles.
