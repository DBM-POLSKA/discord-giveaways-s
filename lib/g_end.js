const fs = require("fs");

class GiveawayEnd {
  constructor(jsonPath, options) {
    this.jsonPath = jsonPath;
    this.giveawayId = options.giveaway_id;

    this.endGiveaway();
  }

  endGiveaway() {
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

          if (giveaway.status === "active") {
            const members = giveaway.members || [];
            const minMembers = giveaway.min_members || 0;

            // Sprawdzenie czy jest ustawione min_members i czy liczba uczestników jest wystarczająca
            if (minMembers > 0 && members.length < minMembers) {
              return; // przerwij kończenie
            }

            giveaway.status = "ended";

            const winnersCount = giveaway.number_of_winners || 1;

            if (members.length === 0) {
              giveaway.winners = [];
            } else {
              // Tasowanie listy uczestników i wybór zwycięzców
              const shuffled = [...members].sort(() => 0.5 - Math.random());
              const winners = shuffled.slice(
                0,
                Math.min(winnersCount, members.length)
              );

              giveaway.winners = winners;
            }
          } else {
          }

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
  GiveawayEnd,
};
