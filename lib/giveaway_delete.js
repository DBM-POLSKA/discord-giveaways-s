/**
 * Deletes a giveaway or all giveaways from the JSON storage file.
 *
 * @param {Object} options
 * @param {string} options.storage - Path to the JSON file containing giveaways
 * @param {string} options.giveawayId - ID of the giveaway to delete or "all" to delete all giveaways
 * @returns {void}
 * @throws Will log an error if the storage file does not exist or if an error occurs during deletion
 */

const fs = require("fs");
const path = require("path");

function GiveawayDelete({ storage, giveawayId }) {
  try {
    const filePath = path.resolve(storage);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Storage file not found at path: ${filePath}`);
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const isDeleteAll = giveawayId === "all" || giveawayId === "ALL";

    if (isDeleteAll) {
      fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
      return;
    }

    if (!data[giveawayId]) {
      throw new Error(`Giveaway with ID '${giveawayId}' does not exist.`);
    }

    delete data[giveawayId];
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  GiveawayDelete,
};
