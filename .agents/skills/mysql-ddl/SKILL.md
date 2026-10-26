---
name: mysql-ddl
description: >
  Write, review, and improve MySQL DDL including tables, data types, primary and
  foreign keys, indexes, unique constraints, character sets, and safe migrations.
  Use for schema design or SQL DDL changes.
---

# MySQL DDL Standards

## Inspect and preserve intent
- Check the project's MySQL version, existing schema conventions, storage engine, charset/collation, and migration tool.
- Use the provided schema as the source of truth. Do not rename tables or columns or change nullability without a reason.
- Output executable SQL in dependency order. For destructive reset scripts, explicitly warn that data will be dropped.

## Table and column design
- Use InnoDB for transactional tables and foreign-key enforcement unless the project has a documented reason otherwise.
- Use `utf8mb4` for text that must support full Unicode. Set the charset/collation consistently at database/table level or explicitly on columns when requested.
- Use consistent snake_case names and avoid reserved words such as `user` where feasible. If preserving an existing schema that uses a reserved word, quote it with backticks consistently.
- Choose the smallest practical type that meets expected range and requirements, without premature over-optimization.
- Use integer types consistently for PK/FK pairs, including signedness. A signed `INT` FK cannot reference an unsigned `INT` PK.
- Use `DECIMAL(p,s)` for exact amounts; avoid floating-point types for money.
- Use `DATE` for calendar dates, and choose `DATETIME` or `TIMESTAMP` intentionally based on timezone and range requirements.
- Define defaults only when the default is a valid business rule. Be explicit about `NULL` versus `NOT NULL`.
- For generated IDs, use `AUTO_INCREMENT` with a primary key.
- For booleans, `BOOLEAN` is an alias for `TINYINT(1)` in MySQL; document whether true/false values are enforced by application logic or constraints.
- Name constraints where doing so improves maintainability, e.g. `fk_user_detail_user`, `uq_user_email`, and `idx_user_role_role_id`.

## Keys and constraints
- Every table should have a deliberate primary key.
- Add `UNIQUE` to business identifiers that must not repeat, such as username and email, if that is the intended rule.
- Use a composite unique constraint to prevent duplicate associations, e.g. `UNIQUE (user_id, role_id)`.
- A one-to-one relationship requires a unique FK. A foreign key alone only guarantees referential integrity, not one-to-one cardinality.
- Use `NOT NULL` on FK columns when the relationship is mandatory. Keep nullable FKs only when unassociated rows are valid.
- Ensure referenced and referencing columns have compatible types and suitable indexes.
- MySQL creates an index for an FK when needed, but an explicit index may still be useful and should be named/documented deliberately. Avoid redundant duplicate indexes.
- Define `ON DELETE` and `ON UPDATE` behavior intentionally. Do not add `CASCADE` automatically; consider `RESTRICT`/default behavior, `CASCADE`, and `SET NULL` according to lifecycle rules.
- Remember that a `UNIQUE` index in MySQL permits multiple `NULL` values. If a value must be present and unique, combine `NOT NULL` and `UNIQUE`.

## Character sets and collation
- Prefer a consistent database/table default such as `DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci` when supported and suitable.
- If compatibility with MySQL 5.7 or a project's chosen collation is required, use a supported collation such as `utf8mb4_unicode_ci`.
- Do not assume all collations are available in all MySQL versions.
- Applying `CHARACTER SET` per column is valid but verbose; choose the style requested by the user or project.
- Collation affects case/accent comparison and uniqueness. Confirm whether usernames/emails should be case-sensitive before selecting a collation.

## Script ordering and safety
- For create scripts, create referenced tables before referencing tables.
- For drop/reset scripts, drop child tables before parent tables.
- `DROP TABLE IF EXISTS` is destructive; explain this clearly when returning a reset script.
- Do not recommend disabling `FOREIGN_KEY_CHECKS` as the default solution. Prefer correct dependency order.
- In migrations, avoid dropping or rewriting data without an explicit requirement. Prefer backward-compatible, incremental changes.
- Use the project's migration system (Flyway/Liquibase) if present; do not make manual DDL the only source of truth in a migration-managed project.

## Review checklist
- Validate syntax against the target MySQL version.
- Check PK/FK type compatibility, nullability, unique constraints, indexes, and delete/update rules.
- Look for redundant indexes, missing FK indexes, accidental nullable unique keys, reserved words, and charset/collation inconsistencies.
- Include rollback guidance for risky migrations when feasible.
- Never claim the DDL was executed unless it actually was.
