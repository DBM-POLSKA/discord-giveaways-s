/**
 * Generates a random identifier and a full giveaway ID.
 * @param {Object} options
 * @param {Object} [options.giveawayIdOptions] - Options for the short ID.
 * @param {number} [options.giveawayIdOptions.idLength=10] - Length of the random portion.
 * @param {string} [options.giveawayIdOptions.charset="0123456789"] - Charset for generating short ID.
 * @param {string} [options.giveawayIdOptions.prefix=""] - Prefix for the short ID.
 * @param {string} [options.giveawayIdOptions.suffix=""] - Suffix for the short ID.
 * @param {string} [options.giveawayIdOptions.separator=""] - Separator for short ID parts.
 * @param {Object} [options.giveawayFullIdOptions] - Options for the full ID.
 * @param {string} [options.giveawayFullIdOptions.prefix="giveaway"] - Prefix for the full ID.
 * @param {string} [options.giveawayFullIdOptions.suffix=""] - Suffix for the full ID.
 * @param {string} [options.giveawayFullIdOptions.separator="_"] - Separator between ID parts.
 * @param {number} [options.giveawayFullIdOptions.randomBytesLength=4] - Byte length for the random hex part.
 * @returns {{giveawayId:string, giveawayFullId:string, timestamp:number}|false}
 */

const crypto = require("crypto");

function generateGiveawayId({
  giveawayIdOptions = {},
  giveawayFullIdOptions = {},
} = {}) {
  try {
    const {
      idLength = 10,
      charset = "0123456789",
      prefix: shortPrefix = "",
      suffix: shortSuffix = "",
      separator: shortSeparator = "",
    } = giveawayIdOptions;

    const {
      prefix: fullPrefix = "giveaway",
      suffix: fullSuffix = "",
      separator: fullSeparator = "_",
      randomBytesLength = 4,
    } = giveawayFullIdOptions;

    let randomId = "";
    for (let i = 0; i < idLength; i++) {
      randomId += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    const idParts = [];
    if (shortPrefix) idParts.push(shortPrefix);
    idParts.push(randomId);
    if (shortSuffix) idParts.push(shortSuffix);
    const giveawayId = idParts.join(shortSeparator);

    const timestamp = Date.now();

    const randomPart = crypto.randomBytes(randomBytesLength).toString("hex");

    const fullParts = [];
    if (fullPrefix) fullParts.push(fullPrefix);
    fullParts.push(giveawayId, String(timestamp), randomPart);
    if (fullSuffix) fullParts.push(fullSuffix);
    const giveawayFullId = fullParts.join(fullSeparator);

    return { giveawayId, giveawayFullId, timestamp };
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = generateGiveawayId;
