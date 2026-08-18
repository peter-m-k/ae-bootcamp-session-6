<!--
Sync Impact Report
- Version change: (none, initial) → 1.0.0
- Modified principles: N/A (initial ratification)
- Added sections:
  - Core Principles: I. Code Quality & Consistency, II. Test-First Reliability (NON-NEGOTIABLE),
    III. Simplicity & Minimal Scope (YAGNI), IV. UI Consistency & Accessibility,
    V. Monorepo Structure & Separation of Concerns
  - Technology Stack Constraints
  - Development Workflow & Quality Gates
  - Governance
- Removed sections: N/A (initial ratification)
- Templates requiring updates:
  - .specify/templates/plan-template.md ⚠ pending manual review (not modified by this command)
  - .specify/templates/spec-template.md ⚠ pending manual review (not modified by this command)
  - .specify/templates/tasks-template.md ⚠ pending manual review (not modified by this command)
- Follow-up TODOs: none
-->

# Todo App Constitution

## Core Principles

### I. Code Quality & Consistency
Code MUST follow the conventions in `docs/coding-guidelines.md`: 2-space indentation,
`camelCase` for variables/functions, `PascalCase` for React components and classes,
`UPPER_SNAKE_CASE` for constants, and the defined import order (external libraries,
internal modules, styles). Code MUST apply DRY, KISS, and SOLID principles, with each
module, component, or function limited to a single responsibility. Code MUST NOT be
merged with unused variables, undefined references, or leftover `console.log`
statements. Errors from operations that can fail MUST be handled explicitly with
actionable feedback, not silently swallowed.
Rationale: shared conventions reduce review overhead and keep the codebase approachable
for bootcamp participants of varying experience levels.

### II. Test-First Reliability (NON-NEGOTIABLE)
Every new feature or bug fix MUST include unit and/or integration tests before it is
considered done, per `docs/testing-guidelines.md`. The test suite MUST maintain 80%+
code coverage across `packages/frontend` and `packages/backend`, with 100% coverage on
critical user workflows (create, view, update, complete, delete todo). Tests MUST verify
observable behavior rather than implementation details, follow the Arrange-Act-Assert
structure, and remain isolated (no shared state, external dependencies mocked). All
tests MUST pass locally via `npm test` before a pull request is opened.
Rationale: reliable tests are the primary safety net for a fast-moving, multi-session
bootcamp codebase where regressions must be caught early.

### III. Simplicity & Minimal Scope (YAGNI)
The application MUST remain the single-user todo app defined in
`docs/functional-requirements.md`: create, view, update, complete/incomplete, and delete
todos with a title and optional due date. Features explicitly out of scope (authentication,
multi-user support, priorities/categories, recurring todos, reminders, undo/redo, bulk
operations, search/filtering, mobile-specific optimization) MUST NOT be implemented without
first updating the functional requirements via a spec change. Implementations MUST prefer
the simplest solution that satisfies a stated requirement over speculative abstraction or
premature optimization.
Rationale: keeps the codebase focused on its bootcamp teaching goals and prevents scope
creep that would obscure the core exercises.

### IV. UI Consistency & Accessibility
All UI work MUST use the design tokens and component patterns defined in
`docs/ui-guidelines.md` (color palette, 8px spacing scale, typography scale, Material
Design-inspired components) and MUST support both light and dark modes. Interactive
elements MUST be keyboard accessible with visible focus indicators, and color contrast
MUST meet WCAG AA. Destructive actions (e.g., deleting a todo) MUST require explicit
user confirmation before executing.
Rationale: a consistent, accessible interface is a stated functional requirement and
avoids ad hoc styling decisions across contributions.

### V. Monorepo Structure & Separation of Concerns
The project MUST remain organized as an npm-workspaces monorepo with `packages/frontend`
(React) and `packages/backend` (Express), each independently testable per
`docs/project-overview.md`. Backend code MUST be layered (routes/controllers/services),
and frontend code MUST be organized by components and services, each colocated with its
own `__tests__/` directory per `docs/coding-guidelines.md`. Packages MUST communicate
only through the documented backend API contract; direct cross-package imports of
internal modules are prohibited.
Rationale: clear boundaries between frontend and backend keep the two deployable units
independently understandable and testable.

## Technology Stack Constraints

The backend MUST run on Node.js v16+ with Express.js, and the frontend MUST be built with
React; both MUST use Jest as the test runner. Persistence MUST go through the existing
backend API — no direct database access from the frontend and no schema changes beyond
basic todo storage. The application MUST remain single-user, with no per-user data
isolation logic introduced.

## Development Workflow & Quality Gates

Work MUST proceed on feature branches (e.g., `feature/<name>`) with pull requests
required before merging to `main`. Before opening a pull request, contributors MUST:
run `npm test` across affected packages and confirm all tests pass, run lint checks and
resolve all errors/warnings, and self-review against the Code Review Checklist in
`docs/coding-guidelines.md`. Commits MUST be atomic and carry descriptive messages
explaining the "why" of the change. Reviewers MUST verify compliance with this
constitution's principles before approving a merge.

## Governance

This constitution supersedes ad hoc conventions and prior undocumented practices. The
files under `docs/` (`coding-guidelines.md`, `testing-guidelines.md`, `ui-guidelines.md`,
`functional-requirements.md`, `project-overview.md`) provide detailed, runtime guidance
and MUST be read as an elaboration of, and subordinate to, the principles above; where
they conflict, this constitution prevails.

Amendments MUST update this file directly and include a Sync Impact Report documenting
the version change, modified/added/removed sections, and any deferred follow-ups.
Versioning follows semantic versioning: MAJOR for backward-incompatible principle removals
or redefinitions, MINOR for new principles or materially expanded guidance, PATCH for
wording clarifications and non-semantic fixes. All pull requests MUST be reviewed for
compliance with these principles; any deviation MUST be explicitly justified in the PR
description or rejected.

**Version**: 1.0.0 | **Ratified**: 2026-08-18 | **Last Amended**: 2026-08-18
