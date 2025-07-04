/**
 * Rerolls the winners of a giveaway.
 *
 * @param {Object} options
 * @param {string} options.storage - Path to the JSON file containing giveaways
 * @param {string} options.giveawayId - Giveaway ID
 * @param {number} [options.winnerCount] - Number of winners to draw (optional)
 * @throws {Error} if the giveaway does not exist or there are no participants
 * @returns {string[]} Array of winner IDs
 */

const fs = require("fs");
const path = require("path");

function GiveawayReroll({ storage, giveawayId, winnerCount }) {
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

    const parsedCount = parseInt(winnerCount, 10);
    const fileCount = parseInt(giveaway.winnerCount, 10);
    const count =
      !isNaN(parsedCount) && parsedCount > 0
        ? parsedCount
        : !isNaN(fileCount) && fileCount > 0
        ? fileCount
        : 1;

    const participantsCopy = [...participants];

    const winners = [];

    for (let i = 0; i < count; i++) {
      if (participantsCopy.length === 0) break;
      const randomIndex = Math.floor(Math.random() * participantsCopy.length);
      winners.push(participantsCopy[randomIndex]);
      participantsCopy.splice(randomIndex, 1);
    }

    giveaway.rerolledWinners = winners;

    giveaway.rerollCount = (giveaway.rerollCount || 0) + 1;

    fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));

    return winners;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  GiveawayReroll,
};
