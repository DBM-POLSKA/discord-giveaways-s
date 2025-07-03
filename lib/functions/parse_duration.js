/**
 * Parses time in various formats (ns, us, ms, s, m, h, d, w, mo, ye) into milliseconds.
 * @param {string} input
 * @returns {number|null}
 */

function parseDuration(input) {
  try {
    input = input.toLowerCase().replace(/[,;|]+|\b(?:and|i)\b/gi, " ");

    const unitVariants = {
      ms: [
        "ms",
        "millisecond",
        "milliseconds",
        "milisekunda",
        "milisekundy",
        "milisekund",
      ],
      s: [
        "s",
        "sec",
        "second",
        "seconds",
        "sek",
        "sekunda",
        "sekundy",
        "sekund",
      ],
      m: ["m", "min", "minute", "minutes", "minuta", "minuty", "minut"],
      h: ["h", "hr", "hour", "hours", "godzina", "godziny", "godzin"],
      d: ["d", "day", "days", "dzien", "dzień", "dni"],
      w: ["w", "week", "weeks", "tydz", "tydzień", "tygodnie", "tygodni"],
      mo: [
        "mo",
        "month",
        "months",
        "miesiac",
        "miesiąc",
        "miesiace",
        "miesiące",
        "miesiecy",
        "miesięcy",
      ],
      ye: ["ye", "year", "years", "rok", "lata", "lat"],
    };

    const unitMap = {};
    const timeMultipliers = {
      ms: 1,
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
      w: 7 * 24 * 60 * 60 * 1000,
      mo: 30 * 24 * 60 * 60 * 1000,
      ye: 365 * 24 * 60 * 60 * 1000,
    };

    for (const [base, variants] of Object.entries(unitVariants)) {
      for (const variant of variants) {
        unitMap[variant.toLowerCase()] = timeMultipliers[base];
      }
    }

    const allUnits = Object.keys(unitMap).join("|");
    const regex = new RegExp(`(-?\\d+(?:\\.\\d+)?)\\s*(${allUnits})`, "gi");

    let total = 0;
    let match;

    while ((match = regex.exec(input)) !== null) {
      const value = parseFloat(match[1]);
      const unit = match[2].toLowerCase();

      if (!unitMap[unit]) continue;

      total += value * unitMap[unit];
    }

    return total > 0 ? total : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = parseDuration;
