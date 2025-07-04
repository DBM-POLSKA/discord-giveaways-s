/**
 * Edits a giveaway by overwriting specified properties.
 *
 * @param {Object} options
 * @param {string} options.storage - Path to the JSON file containing giveaways
 * @param {string} options.giveawayId - Giveaway ID
 * @param {Object} options.edit - Object containing fields to edit
 * @throws {Error} if the giveaway does not exist
 */

const fs = require("fs");
const path = require("path");

function GiveawayEdit({ storage, giveawayId, edit }) {
  try {
    const storagePath = path.resolve(storage);

    if (!fs.existsSync(storagePath)) {
      throw new Error(`Storage file not found at path: ${storagePath}`);
    }

    const data = JSON.parse(fs.readFileSync(storagePath, "utf8"));

    if (!data[giveawayId]) {
      throw new Error(`Giveaway with ID '${giveawayId}' does not exist.`);
    }

    Object.keys(edit).forEach((key) => {
      data[giveawayId][key] = edit[key];
    });

    fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  GiveawayEdit,
};
