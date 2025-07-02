/**
 * Generates a random numeric identifier and a full giveaway ID.
 * @param {number} length - The length of the ID, default is 12
 * @returns {{ giveawayId: string, giveawayFullId: string, timestamp: number }}
 */
const crypto = require("crypto");

function generateGiveawayId(length = 12, randomBytesLength = 4) {
  try {
    let id = "";
    while (id.length < length) {
      id += Math.floor(Math.random() * 10);
    }

    const timestamp = Date.now();

    const randomPart = crypto.randomBytes(randomBytesLength).toString("hex");

    return {
      giveawayId: id,
      giveawayFullId: `giveaway_${id}_${timestamp}_${randomPart}`,
      timestamp,
    };
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = generateGiveawayId;
