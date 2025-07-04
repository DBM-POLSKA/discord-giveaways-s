/**
 * Checks if a given member is a participant in a giveaway.
 *
 * @param {Object} options
 * @param {string} options.storage - Path to JSON file with giveaways
 * @param {string} options.giveawayId - Giveaway ID to check
 * @param {string} options.memberId - Member ID to check for participation
 * @returns {boolean} True if member is in giveaway participants, otherwise false
 */

const fs = require("fs");
const path = require("path");

function CheckIfMemberInGiveaway({ storage, giveawayId, memberId }) {
  try {
    const storagePath = path.resolve(storage);
    if (!fs.existsSync(storagePath)) {
      throw new Error(`Storage file not found at path: ${storagePath}`);
    }

    const data = JSON.parse(fs.readFileSync(storagePath, "utf8"));

    if (!data[giveawayId]) {
      throw new Error(`Giveaway with ID '${giveawayId}' does not exist.`);
    }

    const participants = data[giveawayId].participants || [];
    return participants.includes(memberId);
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  CheckIfMemberInGiveaway,
};
