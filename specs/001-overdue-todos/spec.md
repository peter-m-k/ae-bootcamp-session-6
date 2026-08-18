# Feature Specification: Support for Overdue Todo Items

**Feature Branch**: `001-overdue-todos`

**Created**: 2026-08-18

**Status**: Draft

**Input**: User description: "Support for Overdue Todo Items - Users need a clear, visual way to identify which todos have not been completed by their due date, so they can prioritize work and quickly spot overdue items without manually comparing dates."

## Clarifications

### Session 2026-08-18

- Q: How should the overdue indicator communicate status so it doesn't rely on color alone? → A: Color change only (e.g., red text/border on the todo card)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Spot overdue todos at a glance (Priority: P1)

As a todo application user, I want overdue todos to be visually distinguished in my list so that I can immediately see which tasks are past their due date without comparing each due date to today myself.

**Why this priority**: This is the core value of the feature — without a visual indicator, users gain no benefit. It delivers a complete, usable improvement on its own.

**Independent Test**: Can be fully tested by creating a todo with a due date in the past and leaving it incomplete, then verifying the todo list displays the overdue color treatment on that item, and that other todos are unaffected.

**Acceptance Scenarios**:

1. **Given** a todo with a due date before today and marked incomplete, **When** the user views the todo list, **Then** the todo displays a clear overdue indicator.
2. **Given** a todo with a due date before today that is marked complete, **When** the user views the todo list, **Then** the todo does NOT display an overdue indicator.
3. **Given** a todo with a due date of today, **When** the user views the todo list, **Then** the todo does NOT display an overdue indicator (it is not yet overdue).
4. **Given** a todo with no due date set, **When** the user views the todo list, **Then** the todo never displays an overdue indicator.

---

### User Story 2 - Overdue status stays accurate after changes (Priority: P2)

As a todo application user, I want a todo's overdue indicator to update immediately when I complete it or change its due date, so that the list always reflects accurate, current information.

**Why this priority**: Builds on User Story 1 by ensuring the indicator remains trustworthy after common actions (completing or editing a todo), rather than only being correct at initial page load.

**Independent Test**: Can be fully tested by marking an overdue todo complete and confirming the indicator disappears, then reopening/editing the todo's due date to a future date and confirming the indicator does not reappear.

**Acceptance Scenarios**:

1. **Given** a todo currently showing an overdue indicator, **When** the user marks it complete, **Then** the overdue indicator is removed immediately.
2. **Given** a completed, previously overdue todo, **When** the user marks it incomplete again while its due date remains in the past, **Then** the overdue indicator reappears immediately.
3. **Given** a todo currently showing an overdue indicator, **When** the user edits its due date to a future date, **Then** the overdue indicator is removed immediately upon saving.

---

### Edge Cases

- A todo due exactly today is not overdue; it only becomes overdue starting the day after its due date.
- A todo with no due date is never considered overdue, regardless of age.
- Completed todos are never shown as overdue, even if their due date has passed.
- Toggling a todo between complete/incomplete correctly re-evaluates overdue status each time using the current date.
- The overdue indicator does not change the todo list's sort order — todos remain ordered by creation date (newest first), per existing list behavior.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST visually indicate any todo whose due date is before the current date and whose status is incomplete as "overdue".
- **FR-002**: System MUST NOT mark a todo as overdue if it has no due date set.
- **FR-003**: System MUST NOT mark a todo as overdue if its status is complete, regardless of due date.
- **FR-004**: System MUST NOT treat a todo due on the current date as overdue.
- **FR-005**: System MUST re-evaluate a todo's overdue status whenever the todo list is displayed, and after any create, update, complete/incomplete toggle, or edit action.
- **FR-006**: System MUST NOT alter the todo list's sort order based on overdue status; existing ordering (creation date, newest first) MUST be preserved.
- **FR-007**: System MUST indicate overdue status via a distinct color treatment (e.g., red border and/or text) applied to the todo card, without adding a text label or icon.
- **FR-008**: The overdue color treatment MUST be visually distinguishable in both light and dark mode themes, using the existing danger color from the UI palette.
- **FR-009**: Users MUST be able to recognize overdue todos by color alone, without manually reading and comparing the due date to today's date.

### Key Entities

- **Todo**: Existing entity with title, due date (optional), and completion status. This feature adds a derived "overdue" state, computed from due date, completion status, and the current date — it is not a new stored field.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of incomplete todos with a due date before the current date display the overdue indicator.
- **SC-002**: 0% of completed todos or todos without a due date are ever shown with the overdue indicator.
- **SC-003**: Users can identify all overdue todos in their list within 2 seconds of viewing it, without reading individual due dates.
- **SC-004**: The overdue indicator reflects the correct state within 1 second of a user completing, uncompleting, or editing a todo's due date.

## Assumptions

- Due dates are date-only (no time-of-day component); a todo becomes overdue starting the calendar day after its due date, consistent with the existing due date field defined in functional requirements.
- Overdue status is a derived/computed state evaluated at display time using the current date; it is not persisted as a separate stored field.
- This feature does not introduce filtering, grouping, or reordering of the todo list, consistent with the app's existing "no filtering/sorting" scope constraint — it only adds a visual indicator.
- The existing UI color palette's semantic "danger" color (used for delete/destructive actions) is reused as the sole visual treatment for overdue todos, per clarification — no text label or icon is added.
- Because the indicator relies on color alone, users who cannot perceive the color difference (e.g., color blindness) may not be able to distinguish overdue todos; this trade-off was explicitly accepted during clarification.
- No notifications, reminders, or alerts are introduced by this feature; it is a passive visual indicator within the existing list view only.
