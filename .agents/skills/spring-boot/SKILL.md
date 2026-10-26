---
name: spring-boot
description: >
  Apply project-level Spring Boot architecture and Java coding conventions.
  Use when creating or modifying application layers, configuration, dependency
  injection, transactions, exception handling, logging, or cross-cutting concerns.
---

# Spring Boot Architecture and Coding Conventions

## Objective
Produce maintainable, secure, testable Spring Boot code that fits the existing project. Prefer consistency with the repository over introducing a new architecture or dependency.

## Before making changes
1. Inspect `pom.xml` or `build.gradle`, Java version, Spring Boot version, package structure, existing conventions, and nearby implementations.
2. Read applicable `GEMINI.md`, README, and project-specific documentation.
3. Identify the smallest change that satisfies the request. Do not perform unrelated refactors.
4. Verify API and framework behavior against the project's actual dependency versions; do not assume the newest version.

## Architecture
- Keep responsibilities separated:
  - **Controller**: HTTP concerns, request binding, response status, and API documentation.
  - **Service**: use-case orchestration, business rules, transaction boundaries.
  - **Repository**: persistence queries and data access.
  - **Entity**: persistence state and domain invariants; avoid putting HTTP concerns here.
  - **DTO**: request/response contracts; do not expose persistence entities directly from public APIs by default.
  - **Mapper**: explicit conversion between DTOs and domain/persistence objects when mapping is non-trivial.
- Follow the project's existing package structure. Do not create layers that add no value to a small feature.
- Keep controllers thin. Do not put business logic or complex repository operations in controllers.
- Prefer constructor injection. Avoid field injection and unnecessary `@Autowired` on a single constructor.
- Depend on interfaces or abstractions where they provide a real seam; do not create interfaces mechanically for every class.
- Use clear, domain-specific names. Avoid abbreviations that are not established in the codebase.

## Java conventions
- Follow the project's Java version and existing formatter.
- Prefer immutable values and `final` for fields that should not change.
- Use `var` only when the inferred type remains obvious and consistent with the codebase.
- Avoid raw types, unchecked casts, broad `Object` types, and swallowed exceptions.
- Use `BigDecimal` for monetary values; use `java.time` types for dates and times.
- Use enums or value objects for constrained domain values rather than scattered magic strings.
- Keep methods focused. Extract a method when it clarifies intent, not just to reduce line count.
- Use `Optional` mainly as a return type when absence is meaningful; do not use it for entity fields or method parameters by default.

## Configuration and secrets
- Externalize environment-specific settings in configuration files or environment variables.
- Never commit credentials, tokens, private keys, or production secrets.
- Provide safe defaults only when they are genuinely safe; fail fast for required missing configuration.
- Avoid logging passwords, authorization headers, session identifiers, tokens, or sensitive personal data.
- Do not disable CSRF, TLS checks, validation, or security controls merely to make a failing request pass.

## Transactions and errors
- Place `@Transactional` at the service/use-case boundary where a business operation must be atomic.
- Use `readOnly = true` for read-only service transactions when appropriate.
- Understand Spring proxy limitations: self-invocation does not trigger proxy-based transactional advice.
- Do not make remote HTTP calls inside long-running database transactions unless there is a clear reason.
- Use specific exceptions and a consistent exception-handling strategy, typically centralized with `@ControllerAdvice` for APIs.
- Do not catch an exception unless the code can recover, add useful context, or translate it meaningfully. Preserve the cause when wrapping.
- Return stable, useful error messages without leaking SQL, stack traces, internal paths, or secrets.

## Persistence and performance
- Avoid N+1 queries; inspect generated SQL and fetch plans for relationship-heavy use cases.
- Do not solve every performance concern with eager loading. Prefer use-case-specific fetch joins, entity graphs, or projections.
- Paginate unbounded collection endpoints.
- Avoid exposing lazy entities outside the transaction boundary.
- Use database constraints as well as application validation for invariants that must always hold.

## Implementation workflow
1. Explain the intended change briefly if the task is non-trivial.
2. Implement the smallest coherent change.
3. Update relevant tests and documentation.
4. Run focused tests, then broader tests if practical.
5. Report files changed, important decisions, commands/tests run, and any unresolved risks.
6. Never claim tests passed unless they were actually executed.
