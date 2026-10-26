---
name: code-review
description: >
  Review code changes for correctness, security, maintainability, performance,
  reliability, and test coverage. Use for pull requests, diffs, or requested code audits.
---

# Code Review

## Review approach
- Review the actual diff and relevant surrounding code. Understand intended behavior before judging implementation.
- Prioritize actionable defects over style preferences. Follow repository conventions unless they cause a real problem.
- Do not modify files unless the user asks for fixes; a review normally reports findings first.
- Never claim to have run tests, scanners, or builds unless they were actually run.

## Finding format
For each finding include:
1. **Severity**: Critical / High / Medium / Low.
2. **Location**: file and line(s), when available.
3. **Issue**: the concrete failure or risk.
4. **Impact**: what could happen and under what conditions.
5. **Recommendation**: a specific fix.
6. **Evidence**: explain the code path or assumption supporting the finding.

Order findings by severity and impact. Avoid vague comments such as "this could be better." If no actionable findings are found, say so and mention the scope and limitations of the review.

## Correctness and edge cases
- Check null handling, boundary conditions, incorrect assumptions, race conditions, transaction boundaries, and partial failures.
- Check that validation is performed at trust boundaries and business invariants are enforced.
- Check date/time, timezone, locale, decimal precision, and integer overflow risks where relevant.
- Check pagination, sorting, empty results, duplicate submissions, and idempotency.
- Check resource lifecycle, cleanup, retry behavior, and external dependency failures.

## Security
- Look for broken authentication/authorization, missing object ownership checks, IDOR/BOLA, privilege escalation, and unsafe defaults.
- Check injection risks in SQL, JPQL, shell commands, templates, and logging.
- Check secret exposure, sensitive data in logs/responses, insecure password storage, weak token handling, and accidental CSRF/CORS weakening.
- Check mass assignment, unsafe deserialization, path traversal, file upload validation, SSRF, and open redirects when relevant.
- Check dependencies and configuration for debug mode or insecure production defaults.
- Do not report speculative security concerns as confirmed vulnerabilities; state the preconditions and evidence.

## Spring and persistence
- Verify transaction scope, lazy-loading behavior, N+1 queries, cascade/orphan removal, and entity serialization.
- Check that DTOs prevent unintended field exposure and mutation.
- Check exception translation and that failures are not swallowed.
- Verify SQL constraints, migration ordering, FK compatibility, index usefulness, and rollback/data-loss risk.
- Check that role names and Spring Security matcher semantics align.

## Performance and maintainability
- Look for unbounded queries, repeated DB/network calls, unnecessary eager loading, expensive loops, and missing indexes supported by query patterns.
- Check duplicated logic, unclear ownership, overly complex abstractions, and avoidable coupling.
- Consider observability: useful structured logs and metrics without sensitive information.
- Prefer focused, low-risk recommendations over broad rewrites.

## Testing review
- Check whether tests cover normal paths, invalid input, permissions, edge cases, persistence constraints, and regressions.
- Identify flaky tests, hidden ordering dependencies, time-sensitive assumptions, and mocks that assert implementation rather than behavior.
- Check that assertions meaningfully verify outcomes rather than merely checking that code did not throw.

## Review checklist
- Is the issue reproducible from the code and context?
- Is the severity proportionate?
- Is the finding specific and actionable?
- Is it within the changed code or directly caused by the change?
- Could the finding be a deliberate documented behavior?
- Are positive aspects or test gaps worth mentioning briefly?
