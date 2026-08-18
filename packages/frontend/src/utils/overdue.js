/**
 * Overdue status utility
 * Derives whether a todo is overdue from its due date and completion status.
 */

/**
 * Strips the time-of-day component, returning a Date normalized to local midnight.
 * @param {string|Date} date - A date or ISO date string
 * @returns {Date} Date normalized to the start of its calendar day
 */
function toDateOnly(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * Determines whether a todo is overdue: it has a due date, is incomplete, and
 * its due date's calendar day is before today's calendar day.
 * @param {string|null|undefined} dueDate - ISO date string (YYYY-MM-DD) or null/undefined
 * @param {boolean|number} completed - Completion status (boolean or 0/1)
 * @param {Date} [today] - Current date, defaults to now (injectable for testing)
 * @returns {boolean} True if the todo is overdue
 */
export function isOverdue(dueDate, completed, today = new Date()) {
  if (!dueDate) return false;
  if (completed === true || completed === 1) return false;

  return toDateOnly(dueDate) < toDateOnly(today);
}
