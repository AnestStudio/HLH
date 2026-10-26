---
name: rest-api
description: >
  Design and implement REST endpoints, request/response DTOs, validation,
  pagination, status codes, error contracts, and API documentation in Spring Boot.
  Use when adding or changing HTTP APIs.
---

# REST API Design

## Inspect the existing contract
- Review neighboring controllers, API versioning, response envelope, exception handling, naming, and documentation.
- Preserve established API compatibility unless a breaking change is explicitly requested.
- Confirm whether the application renders server-side pages, exposes JSON APIs, or both.

## Resource and HTTP semantics
- Use nouns for resource paths and standard HTTP methods:
  - `GET` reads and should not mutate state.
  - `POST` creates a resource or triggers a non-idempotent operation.
  - `PUT` replaces a resource representation; `PATCH` partially updates it.
  - `DELETE` deletes or deactivates a resource according to the contract.
- Use plural resource names and consistent path conventions, e.g. `/api/users/{userId}/roles`.
- Return appropriate status codes: `200 OK`, `201 Created` (with `Location` when useful), `204 No Content`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, and `422` only if the project/API convention uses it.
- Do not return `200 OK` for every outcome or encode errors only in a success response body.
- Make retry-sensitive operations idempotent where needed and document idempotency behavior.

## DTOs and validation
- Use dedicated request and response DTOs for public APIs; do not expose JPA entities by default.
- Do not accept server-managed fields such as IDs, roles, account flags, audit timestamps, or ownership values from an untrusted request unless the use case explicitly permits them.
- Apply Bean Validation annotations (`@NotBlank`, `@Email`, `@Size`, `@Positive`, etc.) to request DTOs and use `@Valid` / `@Validated` at the appropriate boundary.
- Validation must reflect business requirements, not just database types. Add service-level checks for rules that span fields or depend on persisted state.
- Do not assume client-side validation is sufficient.
- Avoid returning passwords, password hashes, internal security flags, or unnecessary personal data in DTOs.
- Use explicit mapping. For partial updates, distinguish omitted fields from explicit `null` when the contract requires it.

## Errors
- Define a consistent error shape with a stable machine-readable code, human-readable message, and optional field errors/request correlation ID, matching the existing API convention.
- Use centralized exception handling such as `@RestControllerAdvice` when appropriate.
- Do not expose SQL, stack traces, internal hostnames, filesystem paths, or secret values.
- Use `404` for missing resources, `409` for uniqueness/state conflicts, and `403` for authenticated users lacking permission; avoid leaking resource existence where policy requires concealment.
- Preserve useful diagnostics in server logs while keeping client responses safe.

## Pagination, filtering, and performance
- Paginate collection endpoints that can grow without bound.
- Validate page size and impose a reasonable maximum. Use stable sorting and avoid exposing arbitrary unvalidated sort properties.
- Use query parameters for filtering, sorting, pagination, and search; document defaults and supported values.
- Avoid returning full entity graphs. Use projections/DTOs and query plans suited to the response.
- Use UTC or a clearly documented timezone strategy for API timestamps; serialize dates/times consistently.

## Security and documentation
- Enforce authentication, authorization, and ownership checks server-side.
- Avoid mass assignment by mapping only explicitly allowed request fields.
- Document request/response examples, validation failures, authentication requirements, and important side effects using the project's documentation approach (e.g. OpenAPI if already installed).
- Do not add an API documentation dependency without checking whether the project already has one or needs it.

## Tests and completion
- Test success and failure status codes, validation, missing resources, duplicates, authorization, and boundary cases.
- For create operations, verify persistence and response fields; for updates, verify disallowed fields cannot be modified.
- Keep API changes backward-compatible where possible and call out breaking changes.
