import { isOverdue } from '../overdue';

describe('isOverdue', () => {
  const today = new Date('2026-08-18T12:00:00Z');

  test('returns true for an incomplete todo with a due date before today', () => {
    expect(isOverdue('2026-08-17', 0, today)).toBe(true);
  });

  test('returns false for a todo due today', () => {
    expect(isOverdue('2026-08-18', 0, today)).toBe(false);
  });

  test('returns false for a todo with a future due date', () => {
    expect(isOverdue('2026-08-19', 0, today)).toBe(false);
  });

  test('returns false when the todo has no due date', () => {
    expect(isOverdue(null, 0, today)).toBe(false);
    expect(isOverdue(undefined, 0, today)).toBe(false);
  });

  test('returns false for a completed todo even if the due date has passed', () => {
    expect(isOverdue('2026-08-17', 1, today)).toBe(false);
    expect(isOverdue('2026-08-17', true, today)).toBe(false);
  });
});
