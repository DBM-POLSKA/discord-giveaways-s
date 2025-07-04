/**
 * Adds a user to the giveaway participants list and updates the count.
 *
 * @param {Object} options
 * @param {string} options.storage - Path to the JSON file containing giveaways
 * @param {string} options.giveawayId - Giveaway ID
 * @param {string} options.memberId - ID of the user to add
 * @returns {boolean} true if the user was added or was already in the list, false if the participant limit has been reached
 * @throws {Error} if the giveaway does not exist
 */

const fs = require("fs");
const path = require("path");

function GiveawayJoin({ storage, giveawayId, memberId }) {
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

    if (
      giveaway.maxParticipants !== null &&
      giveaway.participantCount >= giveaway.maxParticipants
    ) {
      return false;
    }

    if (!giveaway.participants.includes(memberId)) {
      giveaway.participants.push(memberId);
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
  GiveawayJoin,
};
