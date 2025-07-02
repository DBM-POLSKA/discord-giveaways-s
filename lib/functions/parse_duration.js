/**
 * Parses time in various formats (ms, s, m, h, d, mo, ye) into milliseconds.
 * @param {string} input
 * @returns {number|null}
 */

function parseDuration(input) {
  try {
    const match =
      /^(\d+)\s*(ms|millisecond|milliseconds|s|sec|second|seconds|m|min|minute|minutes|h|hr|hour|hours|d|day|days|mo|month|months|ye|year|years)$/i.exec(
        input.trim()
      );
    if (!match) return null;

    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();

    const unitMap = {
      // Milliseconds
      ms: 1, // Millisecond
      millisecond: 1, // Millisecond
      milliseconds: 1, // Milliseconds

      // Seconds
      s: 1000, // Second
      sec: 1000, // Second
      second: 1000, // Second
      seconds: 1000, // Seconds

      // Minutes
      m: 60 * 1000, // Minute
      min: 60 * 1000, // Minute
      minute: 60 * 1000, // Minute
      minutes: 60 * 1000, // Minutes

      // Hours
      h: 60 * 60 * 1000, // Hour
      hr: 60 * 60 * 1000, // Hour
      hour: 60 * 60 * 1000, // Hour
      hours: 60 * 60 * 1000, // Hours

      // Days
      d: 24 * 60 * 60 * 1000, // Day
      day: 24 * 60 * 60 * 1000, // Day
      days: 24 * 60 * 60 * 1000, // Days

      // Months (approximated as 30 days)
      mo: 30 * 24 * 60 * 60 * 1000, // Month
      month: 30 * 24 * 60 * 60 * 1000, // Month
      months: 30 * 24 * 60 * 60 * 1000, // Months

      // Years (approximated as 365 days)
      ye: 365 * 24 * 60 * 60 * 1000, // Year
      year: 365 * 24 * 60 * 60 * 1000, // Year
      years: 365 * 24 * 60 * 60 * 1000, // Years
    };

    return unitMap[unit] ? value * unitMap[unit] : null;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = parseDuration;
