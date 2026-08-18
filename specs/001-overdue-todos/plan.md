# Implementation Plan: Support for Overdue Todo Items

**Branch**: `001-overdue-todos` | **Date**: 2026-08-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-overdue-todos/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Add a color-based overdue indicator to the existing todo list: any incomplete todo whose
due date is before today is rendered with the app's existing danger color (in both light
and dark themes). The status is derived at render time from the existing `dueDate` and
`completed` fields — no new stored data, API endpoints, or schema changes are required.
This is a frontend-only change to `packages/frontend`.

## Technical Context

**Language/Version**: JavaScript (ES2020+), React 18.2 (frontend); Node.js v16+ / Express 4.18 (backend, unaffected by this feature)

**Primary Dependencies**: React 18 (existing); no new dependencies required

**Storage**: N/A for this feature — existing SQLite storage (`better-sqlite3`) and the `todos` table schema are unchanged; overdue status is computed, never persisted

**Testing**: Jest + React Testing Library (frontend, existing setup in `packages/frontend`)

**Target Platform**: Web browser, desktop-focused (per `docs/functional-requirements.md`)

**Project Type**: Web application (existing monorepo: `packages/frontend` + `packages/backend`)

**Performance Goals**: Overdue status recalculation and the resulting style update must complete within 1 second of any create/edit/toggle action (SC-004); negligible cost for typical single-user list sizes

**Constraints**: No new persisted fields or API contract changes (constitution Technology Stack Constraints); indicator MUST use color only, no added label/icon (per Clarifications); MUST remain distinguishable in both light and dark themes (FR-008)

**Scale/Scope**: Single-user todo list; no pagination or large-scale data concerns

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Code Quality & Consistency | PASS | New logic isolated in a small, pure utility function; follows existing naming/import conventions |
| II. Test-First Reliability (NON-NEGOTIABLE) | PASS | Overdue computation is a pure function — straightforward to unit test exhaustively; `TodoCard` rendering tests extended for the new class/style |
| III. Simplicity & Minimal Scope (YAGNI) | PASS | Purely additive visual indicator; no new stored fields, no reordering/filtering, matches functional requirements scope exactly |
| IV. UI Consistency & Accessibility | PASS (with noted trade-off) | Reuses existing `--danger-color` token and works in both themes, satisfying stated contrast/theme requirements. The color-only approach (no text/icon) was an explicit, informed choice made during `/speckit.clarify` against the accessibility-favoring recommendation; documented as an accepted trade-off in the spec's Assumptions, not a constitution violation |
| V. Monorepo Structure & Separation of Concerns | PASS | Change is contained entirely within `packages/frontend`; no cross-package coupling introduced |

No violations requiring justification — see Complexity Tracking (empty).

## Project Structure

### Documentation (this feature)

```text
specs/001-overdue-todos/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md         # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

No `contracts/` directory is generated for this feature: it introduces no new or changed
API endpoints — overdue status is computed entirely client-side from data the API already
returns.

### Source Code (repository root)

```text
packages/frontend/
├── src/
│   ├── components/
│   │   ├── TodoCard.js          # Existing — apply overdue CSS class based on computed status
│   │   └── __tests__/
│   │       └── TodoCard.test.js # Existing — extend with overdue rendering cases
│   ├── utils/                   # New — utility functions
│   │   ├── overdue.js           # New — isOverdue(dueDate, completed, today) pure function
│   │   └── __tests__/
│   │       └── overdue.test.js  # New — unit tests for isOverdue
│   └── styles/
│       └── theme.css            # Existing — no new tokens needed (reuses --danger-color)
└── src/App.css                  # Existing — add `.todo-card.overdue` rule

packages/backend/                # Unaffected — no changes in this feature
```

**Structure Decision**: Web application (existing `packages/frontend` + `packages/backend`
monorepo). This feature is implemented entirely within `packages/frontend`: a new pure
utility (`utils/overdue.js`) computes overdue status, `TodoCard.js` applies a CSS class
based on that result, and `App.css`/`theme.css` supply the (already-existing) danger color
for both themes. `packages/backend` requires no changes.

## Complexity Tracking

> No Constitution Check violations — this section intentionally left empty.

