const fs = require("fs");

class GiveawayMonitor {
  /**
   *
   * @param {string} jsonPath - ścieżka do pliku JSON z giveaway
   * @param {number} checkInterval - czas w ms między sprawdzeniami
   * @param {(endedGiveawayId: string) => void} onGiveawayEnd - callback wywoływany po zakończeniu giveaway
   */
  constructor(jsonPath, checkInterval = 1000, onGiveawayEnd = null) {
    this.jsonPath = jsonPath;
    this.checkInterval = checkInterval;
    this.onGiveawayEnd = onGiveawayEnd;
    this.timer = null;
    this.result = null; // tutaj zapiszemy ostatnio zakończone ID
  }

  start() {
    this.timer = setInterval(() => this.checkGiveaways(), this.checkInterval);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  checkGiveaways() {
    let data;
    try {
      const fileContent = fs.readFileSync(this.jsonPath, "utf8");
      data = JSON.parse(fileContent);
    } catch (err) {
      console.error("[Discord Giveaways S] error:", err);
      return;
    }

    const now = new Date();
    let updated = false;

    for (const guildId in data) {
      if (!Array.isArray(data[guildId])) continue;

      for (const giveaway of data[guildId]) {
        if (
          giveaway.status === "active" &&
          giveaway.end_timestamp &&
          new Date(giveaway.end_timestamp) <= now
        ) {
          giveaway.status = "ended";
          giveaway.ended_at = now.toISOString();

          this.result = giveaway.giveaway_id;

          // Tu możesz wywołać callback lub dalszą akcję
          if (this.onGiveawayEnd) {
            this.onGiveawayEnd(this.result);
          }

          updated = true;

          // Jeśli chcesz zakończyć tylko jeden giveaway na raz, można tu break zrobić:
          // break;
        }
      }
      // if (updated) break; // odkomentuj jeśli break po pierwszym zakończeniu
    }

    if (updated) {
      try {
        fs.writeFileSync(this.jsonPath, JSON.stringify(data, null, 2));
      } catch (err) {
        console.error("[Discord Giveaways S] error:", err);
      }
    }
  }
}

module.exports = {
  GiveawayMonitor,
};
