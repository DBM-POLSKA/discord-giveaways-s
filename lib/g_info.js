const fs = require("fs");

class GiveawayInfo {
  constructor(jsonPath, options) {
    this.jsonPath = jsonPath;
    this.giveawayId = options.giveaway_id;
    this.infoKey = options.info; // może być undefined lub pusty string

    this.result = null;

    this.loadInfo();
  }

  loadInfo() {
    let data;
    try {
      const fileContent = fs.readFileSync(this.jsonPath, "utf8");
      data = JSON.parse(fileContent);
    } catch (err) {
      console.error("[Discord Giveaways S] error:", err);
      return;
    }

    if (!this.giveawayId) {
      // Jeśli nie podano ID giveaway, zwróć cały plik JSON
      this.result = data;

      return;
    }

    for (const guildId in data) {
      if (!Array.isArray(data[guildId])) continue;

      for (const giveaway of data[guildId]) {
        if (giveaway.giveaway_id === this.giveawayId) {
          if (!this.infoKey) {
            // jeśli info nie podano lub jest puste -> zwróć cały giveaway
            this.result = giveaway;
          } else if (this.infoKey in giveaway) {
            // zwróć konkretną wartość pola
            this.result = giveaway[this.infoKey];
          } else {
          }
          return;
        }
      }
    }
  }
}

module.exports = {
  GiveawayInfo,
};
