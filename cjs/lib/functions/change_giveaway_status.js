/**
 * Changes the status of a specific giveaway in the JSON file.
 *
 * @param {Object} options
 * @param {string} options.storage - Path to the JSON file with giveaways
 * @param {string} options.giveawayId - Giveaway ID (e.g., "123456789012")
 * @param {string} options.newStatus - New status (e.g., "ended")
 * @returns {boolean} true if successful, false if the giveaway does not exist
 */

const fs = require("fs");
const path = require("path");

const allowedStatuses = [
  "waiting", // The giveaway is created but not started yet.
  "scheduled", // The giveaway is scheduled to start at a future time.
  "running", // The giveaway is currently active and accepting entries.
  "paused", // The giveaway is temporarily paused; no new entries are accepted.
  "ended", // The giveaway has finished normally and winners have been drawn.
  "cancelled", // The giveaway was cancelled before completion.
  "rerolled", // Winners were redrawn after the initial ending.
  "expired", // The giveaway ended without selecting winners (e.g. due to insufficient participants).
  "locked", // The giveaway is locked for modifications or entries.
  "archived", // The giveaway has been archived for record keeping.
  "error", // The giveaway encountered an error state.
];

function changeGiveawayStatus({ storage, giveawayId, newStatus }) {
  try {
    if (!allowedStatuses.includes(newStatus)) {
      throw new Error(
        `Unkown status: ${newStatus}. Allowed: ${allowedStatuses.join(", ")}`
      );
    }

    const filePath = path.resolve(storage);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Storage file not found at path: ${filePath}`);
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const giveaway = data[giveawayId];

    if (!giveaway) {
      return false;
    }

    giveaway.status = newStatus;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = changeGiveawayStatus;
