/**
 * Changes the status of a giveaway.
 *
 * @param {Object} options
 * @param {string} options.storage - Path to the JSON file containing giveaways
 * @param {string} options.giveawayId - The ID of the giveaway
 * @param {string} options.newStatus - The new status to set
 * @throws {Error} if giveawayId does not exist or the status is invalid
 */

const fs = require("fs");
const path = require("path");

function GiveawayChangeStatus({ storage, giveawayId, newStatus }) {
  try {
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

    if (!allowedStatuses.includes(newStatus)) {
      throw new Error(
        `Invalid status '${newStatus}'. Allowed statuses: ${allowedStatuses.join(
          ", "
        )}`
      );
    }

    const storagePath = path.resolve(storage);
    if (!fs.existsSync(storagePath)) {
      throw new Error(`Storage file not found at path: ${storagePath}`);
    }

    const data = JSON.parse(fs.readFileSync(storagePath, "utf8"));

    if (!data[giveawayId]) {
      throw new Error(`Giveaway with ID '${giveawayId}' does not exist.`);
    }

    data[giveawayId].status = newStatus;

    fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  GiveawayChangeStatus,
};
