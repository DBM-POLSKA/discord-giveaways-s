/**
 * Draws winners for a giveaway.
 *
 * @param {Object} options
 * @param {string} options.storage - Path to the giveaway JSON file
 * @param {string} options.giveawayId - ID of the giveaway
 * @param {number} [options.winnerCount] - Number of winners to draw (optional)
 * @throws {Error} if the giveaway does not exist or there are no participants
 * @returns {string[]} array of winner IDs
 */

const fs = require("fs");
const path = require("path");

function GiveawayDrawWinner({ storage, giveawayId, winnerCount }) {
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

    const participants = giveaway.participants || [];

    if (participants.length === 0) {
      throw new Error("No participants in giveaway.");
    }

    const count =
      winnerCount !== undefined ? winnerCount : giveaway.winnerCount || 1;

    const participantsCopy = [...participants];

    const winners = [];

    for (let i = 0; i < count; i++) {
      if (participantsCopy.length === 0) break;
      const randomIndex = Math.floor(Math.random() * participantsCopy.length);
      winners.push(participantsCopy[randomIndex]);
      participantsCopy.splice(randomIndex, 1);
    }

    giveaway.winners = winners;

    fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));

    return winners;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  GiveawayDrawWinner,
};
