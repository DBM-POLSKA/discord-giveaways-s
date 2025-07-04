/**
 * Removes a user from the giveaway participants list and updates the count.
 *
 * @param {Object} options
 * @param {string} options.storage - Path to the JSON file containing giveaways
 * @param {string} options.giveawayId - Giveaway ID
 * @param {string} options.memberId - ID of the user to remove
 * @throws {Error} if the giveaway does not exist
 */

const fs = require("fs");
const path = require("path");

function GiveawayLeave({ storage, giveawayId, memberId }) {
  try {
    const storagePath = path.resolve(storage);

    if (!fs.existsSync(storagePath)) {
      throw new Error(`Storage file not found at path: ${storagePath}`);
    }

    const data = JSON.parse(fs.readFileSync(storagePath, "utf8"));

    if (!data[giveawayId]) {
      throw new Error(`Giveaway with ID '${giveawayId}' does not exist.`);
    }

    const giveaway = data[giveawayId];

    const index = giveaway.participants.indexOf(memberId);
    if (index !== -1) {
      giveaway.participants.splice(index, 1);
    }

    giveaway.participantCount = giveaway.participants.length;

    fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  GiveawayLeave,
};
