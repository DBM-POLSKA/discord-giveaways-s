/**
 * Gets giveawayId from messageId by searching giveaways stored in JSON file.
 *
 * @param {Object} options
 * @param {string} options.storage - Path to the JSON file with giveaways
 * @param {string} options.messageId - The message ID to find the giveaway for
 * @returns {string|null} - The giveawayId if found, or null if not found
 */

const fs = require("fs");
const path = require("path");

function GetGiveawayIdFromMessage({ storage, messageId }) {
  try {
    const filePath = path.resolve(storage);

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    for (const giveawayId in data) {
      if (data[giveawayId].messageId === messageId) {
        return giveawayId;
      }
    }

    return null;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = { GetGiveawayIdFromMessage };
