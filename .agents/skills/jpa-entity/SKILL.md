---
name: jpa-entity
description: >
  Create and review JPA entities, identifiers, column mappings, relationships,
  fetch strategies, lifecycle behavior, and Spring Data JPA persistence mappings.
  Use when working with @Entity, repositories, or ORM mapping.
---

# JPA Entity and Relationship Mapping

## Inspect first
- Check the JPA provider and versions (Jakarta Persistence namespace versus legacy `javax.persistence`).
- Inspect the actual DDL, naming strategy, ID types, nullability, unique constraints, and existing entity conventions.
- Match the database schema unless the task explicitly includes a schema migration. Never silently invent columns or constraints.

## Entity fundamentals
- Use `jakarta.persistence.*` for Jakarta-based projects and `javax.persistence.*` only when required by the project's older stack.
- Annotate persistent classes with `@Entity` and an explicit `@Table` when table naming or constraints need to be clear.
- Define an appropriate `@Id` strategy. For MySQL auto-increment IDs, `GenerationType.IDENTITY` is commonly appropriate; verify project conventions.
- Map column names explicitly when Java and database names differ. Reflect nullability, lengths, precision, and uniqueness accurately.
- Use `BigDecimal` for exact decimal values. Map SQL `DATE` to `LocalDate`, timestamps to an appropriate `LocalDateTime`, `Instant`, or `OffsetDateTime` based on the project's timezone policy.
- Do not use Lombok `@Data` indiscriminately on entities: generated `toString`, `equals`, and `hashCode` can recurse through relationships or trigger lazy loading.
- Avoid including mutable or relationship fields in `equals`/`hashCode`. Follow the project's established entity identity strategy.
- Provide a protected or public no-argument constructor as required by JPA. Keep it protected if application code should not call it directly.
- Do not serialize entities directly from controllers by default; use DTOs to avoid recursion, accidental data exposure, and lazy-loading errors.

## Relationship mapping
- Choose the mapping based on the actual data model:
  - Many rows in child table reference one parent: `@ManyToOne`.
  - One parent has zero or more child rows: `@OneToMany`.
  - One row references at most one row on the other side: `@OneToOne`, normally supported by a unique foreign key.
  - Shared association without extra attributes: `@ManyToMany` can be appropriate; for an explicit join table or association with its own fields, prefer an association entity.
- A foreign key alone does not guarantee one-to-one. The FK column must also be unique for a one-to-one database constraint.
- For bidirectional relationships, the `@ManyToOne` side usually owns the FK; `@OneToMany(mappedBy = "...")` must name the owning Java field, not the column name.
- Keep both sides of a bidirectional association synchronized with helper methods when appropriate.
- Do not add both sides just because a relationship can be bidirectional. Prefer unidirectional mapping unless navigation from both ends is needed.
- Avoid cascade `ALL` and `orphanRemoval = true` unless lifecycle ownership clearly requires them. Never cascade remove from a shared entity such as Role to Users.
- Use `FetchType.LAZY` deliberately for collections and usually for `@ManyToOne` where supported and appropriate. Remember `@OneToOne` and `@ManyToOne` default to EAGER in JPA; specify fetch intent explicitly where possible.
- Do not make every relationship EAGER to fix missing data. Use repository fetch joins, `@EntityGraph`, or projections for a specific use case.
- `LAZY` is a provider hint for some mappings; test the behavior with the configured provider.

## Join tables and constraints
- Use `@JoinColumn(name = "...")` matching the real FK column.
- For `@JoinTable`, explicitly define join and inverse-join columns when useful for clarity and schema alignment.
- Reflect unique constraints and indexes in `@Table(uniqueConstraints = ..., indexes = ...)` only when entity schema generation is used; database migrations/DDL remain authoritative in migration-managed projects.
- For a `User`–`Role` association, if the join table has its own ID or additional attributes, model it as an entity such as `UserRole` rather than hiding those fields in `@ManyToMany`.
- Use `@Enumerated(EnumType.STRING)` for enums unless there is a deliberate compatibility reason otherwise. Avoid ordinal persistence for values that may be reordered.

## Loading, persistence, and serialization
- Keep transaction boundaries in the service layer.
- Use DTO projections or dedicated queries for read-heavy screens instead of loading huge object graphs.
- Check for N+1 queries and unbounded collections.
- Do not rely on Open Session in View to make API serialization work.
- Be careful with `CascadeType.REMOVE`, orphan removal, bidirectional JSON serialization, and detached entity updates.
- Do not bind untrusted request JSON directly onto managed entities. Load the entity and update allowed fields explicitly.

## Validation and verification
- Database constraints enforce integrity across all clients; Bean Validation improves request feedback but does not replace constraints.
- Add persistence tests for critical relationship behavior and uniqueness constraints.
- If schema generation is disabled in production, update the project's migration or DDL source rather than assuming annotations alter the database.
- Before finalizing, verify table/column names, owning sides, nullability, unique constraints, cascade behavior, and expected fetch behavior.
