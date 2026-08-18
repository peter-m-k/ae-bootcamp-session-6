# Data Model: Support for Overdue Todo Items

## Todo (existing entity — schema unchanged)

| Field | Type | Notes |
|---|---|---|
| `id` | integer | Existing primary key |
| `title` | string | Existing, max 255 chars |
| `dueDate` | string (ISO date `YYYY-MM-DD`) or `null` | Existing, optional |
| `completed` | integer (0/1) | Existing |
| `createdAt` | string (timestamp) | Existing, used for list ordering |

No columns are added, removed, or modified. No migration is required.

## Derived: Overdue Status (new — not persisted)

Not a database field or API response field. Computed at render time in the frontend from
existing `Todo` data and the current date.

**Computation rule**:

```text
overdue = dueDate is not null
          AND completed is false
          AND dateOnly(dueDate) < dateOnly(today)
```

- `dateOnly(x)` strips any time-of-day component, comparing calendar dates only.
- Inputs: `todo.dueDate`, `todo.completed` (from the existing `Todo` entity), and the
  current date at the moment of rendering.
- Output: boolean, consumed by `TodoCard` to conditionally apply the overdue CSS class.

**State transitions** (all re-evaluated at render time, no stored state machine):

| Trigger | Effect on `overdue` |
|---|---|
| Due date passes (day boundary) while todo is incomplete | becomes `true` on next render |
| Todo marked complete | becomes `false` immediately |
| Todo marked incomplete again (due date still past) | becomes `true` immediately |
| Due date edited to a future date | becomes `false` immediately |
| Due date cleared | becomes `false` immediately (FR-002) |
