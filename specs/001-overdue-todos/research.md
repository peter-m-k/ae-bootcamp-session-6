# Research: Support for Overdue Todo Items

No `NEEDS CLARIFICATION` items remain in the Technical Context — this feature reuses the
existing frontend stack entirely. The decisions below resolve implementation-approach
questions raised while translating the spec into a technical design.

## Decision 1: Compute overdue status client-side as a derived value

**Decision**: Overdue status is computed by a pure frontend utility function
(`isOverdue(dueDate, completed, today)`) called at render time in `TodoCard`. It is never
stored in the database or returned as a new API field.

**Rationale**: FR-005 requires re-evaluation on every list display and after every
create/update/toggle action, which a pure render-time computation satisfies for free. The
constitution's Technology Stack Constraints prohibit schema changes beyond basic todo
storage, and the Simplicity principle favors the smallest change that satisfies the
requirement.

**Alternatives considered**: Computing and returning an `overdue` flag from the backend —
rejected because it would require an API contract change and duplicate logic that is
already trivial to run client-side, adding coupling without benefit.

## Decision 2: Day-granularity date comparison

**Decision**: Compare dates at calendar-day granularity (strip time-of-day), so a todo
becomes overdue starting the day after its due date. A todo due "today" is not overdue.

**Rationale**: `dueDate` is exchanged as a date-only ISO string (`YYYY-MM-DD`, sourced from
an `<input type="date">`), consistent with existing formatting logic in `TodoCard.js`.
Comparing full timestamps would risk flagging a todo due "today" as overdue depending on
the time of day, contradicting FR-004.

**Alternatives considered**: Comparing raw `Date` objects/timestamps directly — rejected
for the time-of-day inconsistency described above.

## Decision 3: Apply the indicator via a CSS class, reusing the existing danger color

**Decision**: Toggle a `.todo-card.overdue` class (or equivalent) on the existing todo
card, styled in `App.css` using the existing `--danger-color` CSS variable from
`theme.css`. No inline styles and no new color tokens.

**Rationale**: Matches the existing pattern already used for the `.completed` class in
`TodoCard.js`/`App.css`, keeps styling declarative and themeable, and automatically
supports both light and dark modes since `--danger-color` is already defined for both.

**Alternatives considered**: Inline computed styles in JS — rejected as inconsistent with
the codebase's existing CSS-class-based styling convention and harder to theme.

**Output**: All Technical Context items resolved; no outstanding unknowns remain before
Phase 1 design.
