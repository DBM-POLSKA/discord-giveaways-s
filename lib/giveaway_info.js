/**
 * Retrieves specific information about a giveaway by its ID.
 * @param {Object} options
 * @param {string} options.storage - Path to the JSON file containing giveaways
 * @param {string} options.giveawayId - Giveaway ID
 * @param {string} options.info - The key of the information to retrieve from the giveaway (e.g., "prize", "duration", "winners")
 * @returns {any|null} - The value of the requested field or null if not found
 */

const fs = require("fs");
const path = require("path");

function GiveawayInfo({ storage, giveawayId, info }) {
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

    // Jeśli podany klucz info nie istnieje w giveaway, zwróć null
    if (!(info in giveaway)) {
      return null;
    }

    return giveaway[info];
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  GiveawayInfo,
};
