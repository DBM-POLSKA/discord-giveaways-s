/**
 * Creates a giveaway template.
 * @param {Object} options
 * @param {string} options.giveawayId
 * @param {string} options.giveawayFullId
 * @param {number} options.now - Current timestamp in milliseconds
 * @param {number} options.durationMs - Duration of the giveaway in milliseconds
 * @param {Object} config - Additional configuration options
 * @returns {Object} The giveaway template object
 */

function createGiveawayTemplate(
  { giveawayId, giveawayFullId, now, durationMs },
  config
) {
  return {
    giveawayId,
    giveawayFullId,
    guildId: config.guildId || "",
    channelId: config.channelId || "",
    messageId: config.messageId || "",
    hostId: config.hostId || "",
    startTimestamp: now,
    endTimestamp: now + durationMs,
    duration: config.duration,
    prize: config.prize,
    description: config.description || "",
    winnerCount:
      typeof config.winnerCount === "number" && config.winnerCount > 0
        ? config.winnerCount
        : 1,
    participantCount: 0,
    minParticipants: config.minParticipants ?? 0,
    maxParticipants: config.maxParticipants ?? null,
    rerollCount: 0,
    participants: [],
    winners: [],
    rerolledWinners: [],
    allowedRoles: config.allowedRoles || [],
    allowedMembers: config.allowedMembers || [],
    blacklistedRoles: config.blacklistedRoles || [],
    blacklistedMembers: config.blacklistedMembers || [],
    ended: false,
    status: config.autoStart === false ? "waiting" : "running",
  };
}

module.exports = createGiveawayTemplate;
