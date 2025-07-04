/**
 * Extends a giveaway by the specified amount of time.
 *
 * @param {Object} options
 * @param {string} options.storage - Path to the JSON file containing giveaways
 * @param {string} options.giveawayId - Giveaway ID
 * @param {string} options.time - Time to add (e.g., "1m", "1h", "30s")
 * @throws {Error} if the storage file does not exist or the giveaway is not found
 */

const fs = require("fs");
const path = require("path");
const parseDuration = require("./functions/parse_duration");

function GiveawayExtend({ storage, giveawayId, time }) {
  try {
    const storagePath = path.resolve(storage);

    if (!fs.existsSync(storagePath)) {
      throw new Error(`Storage file not found at path: ${storagePath}`);
    }

    const data = JSON.parse(fs.readFileSync(storagePath, "utf8"));

    if (!data[giveawayId]) {
      throw new Error(`Giveaway with ID '${giveawayId}' does not exist.`);
    }

    const msToAdd = parseDuration(time);
    if (typeof msToAdd !== "number" || msToAdd <= 0) {
      throw new Error(`Invalid time format: ${time}`);
    }

    const giveaway = data[giveawayId];

    if (giveaway.ended) {
      throw new Error(`Cannot extend giveaway which is already ended.`);
    }

    giveaway.endTimestamp = (giveaway.endTimestamp || Date.now()) + msToAdd;

    if (giveaway.status !== "running") {
      giveaway.status = "running";
    }

    if (giveaway.ended) {
      giveaway.ended = false;
    }

    fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  GiveawayExtend,
};
