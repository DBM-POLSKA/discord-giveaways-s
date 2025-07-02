/**
 * Creates a new giveaway and saves it in the storage file.
 * @param {Object} options
 * @param {string} options.storage - Path to the JSON file containing all giveaways.
 * @param {Object} options.config - Giveaway configuration.
 * @returns {string} giveawayId
 */

const fs = require("fs");
const path = require("path");

const generateGiveawayId = require("./functions/generate_giveaway_id");
const parseDuration = require("./functions/parse_duration");
const createGiveawayTemplate = require("./functions/json_file_template");

function GiveawayCreate({ storage, config }) {
  try {
    if (!config?.prize) throw new Error("config.prize is required!");
    if (!config?.duration) throw new Error("config.duration is required!");

    const storagePath = path.resolve(storage);

    if (!fs.existsSync(storagePath)) {
      fs.writeFileSync(storagePath, JSON.stringify({}, null, 2));
    }

    const data = JSON.parse(fs.readFileSync(storagePath, "utf8"));

    const { giveawayId, giveawayFullId } = generateGiveawayId(12);
    const now = Date.now();

    const ms = parseDuration(config.duration);
    if (ms === null) throw new Error("Invalid duration format!");

    const newGiveaway = createGiveawayTemplate(
      { giveawayId, giveawayFullId, now, durationMs: ms },
      config
    );

    data[giveawayId] = newGiveaway;
    fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));

    return giveawayId;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  GiveawayCreate,
};
