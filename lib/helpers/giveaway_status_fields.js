const GiveawayStatusFields = {
  WAITING: "waiting", // The giveaway is created but not started yet.
  SCHEDULED: "scheduled", // The giveaway is scheduled to start at a future time.
  RUNNING: "running", // The giveaway is currently active and accepting entries.
  PAUSED: "paused", // The giveaway is temporarily paused; no new entries are accepted.
  ENDED: "ended", // The giveaway has finished normally and winners have been drawn.
  CANCELLED: "cancelled", // The giveaway was cancelled before completion.
  REROLLED: "rerolled", // Winners were redrawn after the initial ending.
  EXPIRED: "expired", // The giveaway ended without selecting winners (e.g. due to insufficient participants).
  LOCKED: "locked", // The giveaway is locked for modifications or entries.
  ARCHIVED: "archived", // The giveaway has been archived for record keeping.
  ERROR: "error", // An error occurred during giveaway processing.
};

module.exports = {
  GiveawayStatusFields,
};
