const fs = require("fs");

class GiveawayDelete {
  constructor(jsonPath, options) {
    this.jsonPath = jsonPath;
    this.giveawayId = options.giveaway_id;

    this.deleteGiveaway();
  }

  deleteGiveaway() {
    let data;
    try {
      const fileContent = fs.readFileSync(this.jsonPath, "utf8");
      data = JSON.parse(fileContent);
    } catch (err) {
      console.error("[Discord Giveaways S] error:", err);
      return;
    }

    const isDeleteAll = this.giveawayId === "all";
    let found = false;

    for (const guildId in data) {
      if (!Array.isArray(data[guildId])) continue;

      if (isDeleteAll) {
        if (data[guildId].length > 0) {
          data[guildId] = [];
          found = true;
        }
      } else {
        const index = data[guildId].findIndex(
          (giveaway) => giveaway.giveaway_id === this.giveawayId
        );

        if (index !== -1) {
          data[guildId].splice(index, 1);
          found = true;

          break;
        }
      }
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
  GiveawayDelete,
};
