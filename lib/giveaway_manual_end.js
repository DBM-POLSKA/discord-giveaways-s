/**
 * Ends a giveaway by setting the status to "ended" and ended to true.
 * Optionally draws winners.
 *
 * @param {Object} options
 * @param {string} options.storage - Path to the JSON file containing giveaways
 * @param {string} options.giveawayId - Giveaway ID
 * @param {boolean} [options.drawWinner=true] - Whether to draw winners
 * @param {number} [options.winnerCount] - Number of winners to draw (if not provided, taken from the giveaway data)
 * @throws {Error} if the giveawayId does not exist
 * @returns {boolean|array} true if no winners were drawn, or an array of winners if they were drawn
 */

const fs = require("fs");
const path = require("path");
const { GiveawayDrawWinner } = require("./giveaway_draw_winner");

function GiveawayManualEnd({
  storage,
  giveawayId,
  drawWinner = true,
  winnerCount,
}) {
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

    giveaway.status = "ended";
    giveaway.ended = true;

    let winners = null;

    if (drawWinner) {
      // Losowanie zwycięzców za pomocą GiveawayDrawWinner
      winners = GiveawayDrawWinner({
        storage,
        giveawayId,
        winnerCount,
      });

      // Zapisz zwycięzców do giveaway (nadpisujemy winners)
      giveaway.winners = winners;
    }

    fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));

    return drawWinner ? winners : true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  GiveawayManualEnd,
};
