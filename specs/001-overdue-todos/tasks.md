# Tasks: Support for Overdue Todo Items

**Input**: Design documents from `/specs/001-overdue-todos/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md)

**Tests**: Included — the project constitution (Principle II, NON-NEGOTIABLE) requires unit/integration tests for every feature before it's considered done.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)
- Paths are relative to the repository root; this feature only touches `packages/frontend`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the new utility module location

- [ ] T001 [P] Create `packages/frontend/src/utils/` and `packages/frontend/src/utils/__tests__/` directories for the new overdue-status utility (per plan.md Project Structure)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The shared `isOverdue` computation and its styling — both user stories render against this, so it must exist first

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T002 [P] Write failing unit tests for `isOverdue(dueDate, completed, today)` in `packages/frontend/src/utils/__tests__/overdue.test.js`, covering: past due date + incomplete → `true`; due today → `false`; future due date → `false`; no due date → `false`; past due date + completed → `false` (per data-model.md computation rule)
- [ ] T003 Implement `isOverdue(dueDate, completed, today)` in `packages/frontend/src/utils/overdue.js` using day-granularity date comparison (per research.md Decision 2) to make T002 pass
- [ ] T004 [P] Add a `.todo-card.overdue` rule in `packages/frontend/src/App.css` that applies the existing `--danger-color` token from `packages/frontend/src/styles/theme.css` (per research.md Decision 3), so the color is correct in both light and dark themes

**Checkpoint**: `isOverdue` utility and its styling are ready — User Stories 1 and 2 can now build on them

---

## Phase 3: User Story 1 - Spot overdue todos at a glance (Priority: P1) 🎯 MVP

**Goal**: Any incomplete todo with a due date before today is visually marked overdue using the danger color, in both themes

**Independent Test**: Create a todo with a due date in the past and leave it incomplete; verify the todo card shows the overdue color treatment while unrelated todos (completed, due today, no due date) do not

### Tests for User Story 1

- [ ] T005 [P] [US1] Add rendering tests to `packages/frontend/src/components/__tests__/TodoCard.test.js`: overdue todo (past due date, incomplete) has the `overdue` class; completed todo with a past due date does not; todo due today does not; todo with no due date does not (per spec.md Acceptance Scenarios 1-4)

### Implementation for User Story 1

- [ ] T006 [US1] In `packages/frontend/src/components/TodoCard.js`, import `isOverdue` from `../utils/overdue` and conditionally append the `overdue` class to the todo card's root `className` based on `todo.dueDate`, `todo.completed`, and the current date (depends on T003, T005)

**Checkpoint**: User Story 1 is fully functional and independently testable — overdue todos are visually distinguished on load

---

## Phase 4: User Story 2 - Overdue status stays accurate after changes (Priority: P2)

**Goal**: The overdue indicator updates immediately when a todo is completed/uncompleted or its due date is edited

**Independent Test**: Mark an overdue todo complete and confirm the indicator disappears; mark it incomplete again and confirm it reappears; edit its due date to a future date and confirm it disappears

### Tests for User Story 2

- [ ] T007 [P] [US2] Add re-render tests to `packages/frontend/src/components/__tests__/TodoCard.test.js`: re-rendering with `completed` toggled true removes the `overdue` class; toggling back to false (due date still past) reapplies it; re-rendering with a future `dueDate` removes it (per spec.md Acceptance Scenarios 1-3 for User Story 2)

### Implementation for User Story 2

- [ ] T008 [US2] Confirm `TodoCard` and `packages/frontend/src/components/TodoList.js` re-render with the updated `todo` prop after every toggle/edit action (no `React.memo` or other memoization blocks it), so the `overdue` class recomputes automatically; adjust only if T007 reveals a stale render (depends on T006, T007)

**Checkpoint**: User Stories 1 and 2 both work independently — the indicator is correct on load and stays correct after edits

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Verify constitution compliance and finalize the change

- [ ] T009 [P] Run `npm test --workspace=packages/frontend -- --coverage` and confirm 80%+ coverage is maintained (constitution Principle II)
- [ ] T010 Execute the manual validation steps in `specs/001-overdue-todos/quickstart.md`
- [ ] T011 [P] Self-review all changed files against the Code Review Checklist in `docs/coding-guidelines.md` before opening a pull request

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS both user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion only
- **User Story 2 (Phase 4)**: Depends on Foundational completion; builds on the `overdue` class added in US1 (T006), so it is implemented after US1 for this feature even though both stories are conceptually independent
- **Polish (Phase 5)**: Depends on both user stories being complete

### Within Each User Story

- Tests (T005, T007) are written before their corresponding implementation task and must fail first
- Foundational utility (T003) before any story implementation
- Story complete and checkpoint validated before moving to the next priority

### Parallel Opportunities

- T002 and T004 can run in parallel (different files) once T001 is done
- T005 can be authored in parallel with T004 (different files), though it will fail until T006 lands
- T009 and T011 can run in parallel in the Polish phase

---

## Parallel Example: Foundational Phase

```bash
# After T001 completes, launch together:
Task: "Write failing unit tests for isOverdue in packages/frontend/src/utils/__tests__/overdue.test.js"
Task: "Add .todo-card.overdue rule in packages/frontend/src/App.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks both stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Run T005 tests and the relevant quickstart.md steps
5. This alone delivers the core value: overdue todos are visually identifiable

### Incremental Delivery

1. Setup + Foundational → utility and styling ready
2. Add User Story 1 → test independently → MVP demonstrable
3. Add User Story 2 → test independently → indicator stays accurate after edits
4. Polish → coverage check, manual quickstart validation, self-review

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Verify tests fail before implementing (T002 before T003; T005 before T006; T007 before T008)
- Commit after each task or logical group
- No backend tasks: this feature is frontend-only (see plan.md Summary)
