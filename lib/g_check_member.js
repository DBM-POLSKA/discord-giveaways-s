const fs = require("fs");

class GiveawayCheckMember {
  constructor(jsonPath, options) {
    this.jsonPath = jsonPath;
    this.giveawayId = options.giveaway_id;
    this.memberId = options.member_id;
    this.result = false;

    this.checkMember();
  }

  checkMember() {
    let data;
    try {
      const fileContent = fs.readFileSync(this.jsonPath, "utf8");
      data = JSON.parse(fileContent);
    } catch (err) {
      console.error("[Discord Giveaways S] error:", err);
      return;
    }

    for (const guildId in data) {
      if (!Array.isArray(data[guildId])) continue;

      for (const giveaway of data[guildId]) {
        if (giveaway.giveaway_id === this.giveawayId) {
          if (Array.isArray(giveaway.members)) {
            this.result = giveaway.members.some(
              (m) => m.toString() === this.memberId.toString()
            );
          }
          return;
        }
      }
    }
  }
}

module.exports = {
  GiveawayCheckMember,
};
