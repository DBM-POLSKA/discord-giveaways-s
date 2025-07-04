const GiveawayInfoFields = {
    GIVEAWAY_ID: "giveawayId", // Unique identifier for the giveaway
    GIVEAWAY_FULL_ID: "giveawayFullId", // Full giveaway ID including timestamp or extra data
    GUILD_ID: "guildId", // ID of the Discord server (guild)
    CHANNEL_ID: "channelId", // ID of the channel where giveaway is hosted
    MESSAGE_ID: "messageId", // ID of the giveaway message
    HOST_ID: "hostId", // ID of the user hosting the giveaway
    START_TIMESTAMP: "startTimestamp", // Timestamp when the giveaway started
    END_TIMESTAMP: "endTimestamp", // Timestamp when the giveaway ends
    START_TIMESTAMP_UNIX: "startTimestampUnix", // Start time as UNIX timestamp (seconds)
    END_TIMESTAMP_UNIX: "endTimestampUnix", // End time as UNIX timestamp (seconds)
    START_TIMESTAMP_RELATIVE: "startTimestampRelative", // Discord-formatted relative start time (e.g., <t:...:R>)
    END_TIMESTAMP_RELATIVE: "endTimestampRelative", // Discord-formatted relative end time (e.g., <t:...:R>)
    DURATION: "duration", // Duration of the giveaway (e.g., "1m", "2h")
    PRIZE: "prize", // Prize of the giveaway
    DESCRIPTION: "description", // Description of the giveaway
    WINNER_COUNT: "winnerCount", // Number of winners to select
    PARTICIPANT_COUNT: "participantCount", // Number of participants joined
    MIN_PARTICIPANT: "minParticipants", // Minimum required participants for valid giveaway
    MAX_PARTICIPANT: "maxParticipants", // Maximum participants allowed
    REROLL_COUNT: "rerollCount", // Number of times winners have been rerolled
    PARTICIPANTS: "participants", // List of participant user IDs
    WINNERS: "winners", // List of winner user IDs
    REROLLED_WINNERS: "rerolledWinners", // List of rerolled winner user IDs
    ALLOWED_ROLES: "allowedRoles", // Roles allowed to participate
    ALLOWED_MEMBERS: "allowedMembers", // Specific members allowed to participate
    BLACKLISTED_ROLES: "blacklistedRoles", // Roles banned from participating
    BLACKLISTED_MEMBERS: "blacklistedMembers", // Members banned from participating
    ENDED: "ended", // Boolean indicating if giveaway has ended
    STATUS: "status", // Current status of the giveaway (e.g., running, ended)
};
export { GiveawayInfoFields };
export default {
    GiveawayInfoFields
};
