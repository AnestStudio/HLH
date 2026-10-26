---
name: unit-test
description: >
  Create and improve automated tests for Java and Spring Boot using JUnit 5,
  Mockito, AssertJ, Spring test support, and MockMvc where appropriate.
  Use when writing tests or diagnosing test failures.
---

# Unit Testing with JUnit and Mockito

## Inspect the test stack
- Check dependency versions, existing test style, build tool, naming conventions, and test fixtures.
- Use JUnit Jupiter (JUnit 5) when supported by the project. Match the project's actual version and imports.
- Prefer the assertions and libraries already present (JUnit assertions, AssertJ, Hamcrest); do not add dependencies without need.
- Keep tests deterministic, isolated, readable, and fast.

## What to test
- Test observable behavior and business rules rather than private methods or implementation details.
- Cover the happy path, invalid inputs, boundary values, missing records, duplicate/conflict cases, and meaningful failure paths.
- Add regression tests for reported bugs before or alongside fixes.
- Use descriptive names such as `createUser_whenEmailAlreadyExists_throwsConflict`.
- Follow Arrange–Act–Assert or the repository's established Given–When–Then structure.
- Keep each test focused on one behavior. Avoid giant tests with many unrelated assertions.

## Unit tests and mocks
- Use Mockito to isolate true external dependencies such as repositories, clients, or gateways when testing service logic.
- Prefer constructor injection so dependencies are easy to provide in tests.
- Use `@ExtendWith(MockitoExtension.class)` for Mockito-based JUnit 5 tests where appropriate.
- Use `@Mock` for dependencies and `@InjectMocks` only when it provides clear, reliable construction; explicit construction is often easier to understand.
- Stub only behavior required by the test. Avoid excessive stubbing and unnecessary `verify` calls.
- Verify interactions when the interaction is part of the behavior (e.g. no save after failed validation), not merely to mirror the implementation.
- Avoid mocking simple value objects, DTOs, or the class under test.
- Do not use `@SpringBootTest` for every test. Use plain unit tests for isolated logic and Spring context tests only when wiring/configuration behavior needs verification.

## Spring integration and web tests
- Use `@WebMvcTest` with `MockMvc` for controller behavior when appropriate; mock the service boundary.
- Test request validation, status codes, response bodies, and authorization rules.
- Use `@DataJpaTest` for repository and mapping behavior; ensure test DB configuration matches intended behavior.
- Use `@SpringBootTest` when full application wiring or cross-layer behavior is required, not as the default.
- If Spring Security is enabled, test authenticated, unauthenticated, forbidden, CSRF, and role-specific cases as applicable.
- Avoid relying on production databases or external network services in ordinary unit tests.

## Persistence and fixtures
- For JPA relationships, test owning-side mapping, uniqueness, cascade behavior, and query fetch behavior when these are important.
- Use realistic fixtures and explicit IDs only when the test requires them.
- Avoid shared mutable static fixtures and order-dependent tests.
- Be deliberate with transaction rollback behavior in integration tests; a rollback can hide after-commit behavior.
- Do not assume an in-memory database behaves exactly like MySQL for collation, constraints, JSON types, or SQL dialect behavior.

## Time, randomness, and environment
- Inject `Clock` or use fixed time where practical for time-dependent logic.
- Avoid sleeps and arbitrary timeouts. Prefer synchronization primitives or deterministic test hooks.
- Avoid tests that depend on local timezone, machine locale, filesystem layout, or external service availability.
- Clean up resources and temporary files.

## Quality and execution
- Assertions should verify meaningful values, state changes, and side effects.
- For exception tests, assert the expected exception and relevant message/code when stable.
- Do not assert private implementation details unless absolutely necessary.
- Run the smallest relevant test set first, then the full test suite if feasible.
- Report exact commands and outcomes. If tests were not run, state that explicitly; never fabricate passing results.
