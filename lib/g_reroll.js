const fs = require("fs");

class GiveawayReroll {
  constructor(jsonPath, options) {
    this.jsonPath = jsonPath;
    this.giveawayId = options.giveaway_id;
    this.customMembersCount = options.members;

    this.rerollGiveaway();
  }

  rerollGiveaway() {
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
        if (giveaway.giveaway_id === this.giveawayId) {
          found = true;

          if (giveaway.status !== "ended") {
            return;
          }

          const members = giveaway.members || [];
          const previousWinners = giveaway.winners || [];

          // Filtrujemy, by usunąć poprzednich zwycięzców z listy losowania
          const eligibleMembers = members.filter(
            (id) => !previousWinners.includes(id)
          );

          if (eligibleMembers.length === 0) {
            giveaway.new_winners = [];
            break;
          }

          const winnersCount =
            this.customMembersCount || giveaway.number_of_winners || 1;

          // Losowanie z dostępnych (bez powtórek)
          const shuffled = [...eligibleMembers].sort(() => 0.5 - Math.random());
          const newWinners = shuffled.slice(
            0,
            Math.min(winnersCount, eligibleMembers.length)
          );

          giveaway.new_winners = newWinners;

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
  GiveawayReroll,
};
