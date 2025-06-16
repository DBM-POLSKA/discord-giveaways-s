const fs = require("fs");

class GiveawayIdFromInteraction {
  constructor(jsonPath, options) {
    this.jsonPath = jsonPath;
    this.interaction = options.interaction;
    this.result = null;

    this.findGiveawayId();
  }

  findGiveawayId() {
    let data;
    try {
      const fileContent = fs.readFileSync(this.jsonPath, "utf8");
      data = JSON.parse(fileContent);
    } catch (err) {
      console.error("[Discord Giveaways S] error:", err);
      return;
    }

    if (
      !this.interaction ||
      !this.interaction.message ||
      !this.interaction.message.id
    ) {
      console.error("[Discord Giveaways S] Incorrect interaction.");
      return;
    }

    const messageId = this.interaction.message.id;

    // Przeszukujemy giveaway wg guildId -> tablica giveaway
    for (const guildId in data) {
      if (!Array.isArray(data[guildId])) continue;

      for (const giveaway of data[guildId]) {
        if (typeof giveaway.giveaway_full_id === "string") {
          // Sprawdzamy, czy full_id zaczyna się od messageId + "_"
          if (giveaway.giveaway_full_id.startsWith(messageId + "_")) {
            this.result = giveaway.giveaway_id; // short id
            return;
          }
        }
      }
    }
  }
}

module.exports = {
  GiveawayIdFromInteraction,
};
