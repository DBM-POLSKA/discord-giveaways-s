const fs = require("fs");

class GiveawayLeave {
  constructor(jsonPath, options) {
    this.jsonPath = jsonPath;
    this.giveawayId = options.giveaway_id;
    this.memberId = options.member_id;

    this.loadAndRemoveMember();
  }

  loadAndRemoveMember() {
    let data;
    try {
      const fileContent = fs.readFileSync(this.jsonPath, "utf8");
      data = JSON.parse(fileContent);
    } catch (err) {
      console.error("B[Discord Giveaways S] error:", err);
      return;
    }

    let found = false;

    for (const guildId in data) {
      if (!Array.isArray(data[guildId])) continue;

      for (const giveaway of data[guildId]) {
        if (giveaway.giveaway_id == this.giveawayId) {
          found = true;

          const index = giveaway.members.indexOf(this.memberId);
          if (index !== -1) {
            giveaway.members.splice(index, 1);
          } else {
          }

          // Zawsze aktualizuj liczbę członków
          giveaway.number_of_members = giveaway.members.length;

          break;
        }
      }
      if (found) break;
    }

    if (!found) {
      return;
    }

    try {
      fs.writeFileSync(this.jsonPath, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("[Discord Giveaways S] error:", err);
    }
  }
}

module.exports = {
  GiveawayLeave,
};
