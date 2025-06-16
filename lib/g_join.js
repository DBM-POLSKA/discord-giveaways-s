const fs = require("fs");

class GiveawayJoin {
  constructor(jsonPath, options) {
    this.jsonPath = jsonPath;
    this.giveawayId = options.giveaway_id;
    this.memberId = options.member_id;

    this.loadAndAddMember();
  }

  loadAndAddMember() {
    let data;
    try {
      const fileContent = fs.readFileSync(this.jsonPath, "utf8");
      data = JSON.parse(fileContent);
    } catch (err) {
      console.error("[Discord Giveaways S] error:", err);
      return;
    }

    let found = false;

    for (const guildId in data) {
      if (!Array.isArray(data[guildId])) continue;

      for (const giveaway of data[guildId]) {
        if (giveaway.giveaway_id == this.giveawayId) {
          found = true;

          // Sprawdzenie limitu max_members, jeśli jest ustawione
          if (
            giveaway.max_members &&
            giveaway.members.length >= giveaway.max_members
          ) {
            return; // przerywamy dalsze działanie, bo max osiągnięty
          }

          if (!giveaway.members.includes(this.memberId)) {
            giveaway.members.push(this.memberId);
          } else {
          }

          // Aktualizacja liczby członków na podstawie tablicy members
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
  GiveawayJoin,
};
