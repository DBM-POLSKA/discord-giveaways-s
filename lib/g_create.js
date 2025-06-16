const fs = require("fs");
const path = require("path");

class GiveawayBuilder {
  constructor(filePath, data) {
    this.filePath = path.resolve(filePath);
    this.data = data;
    this.saveGiveaway();
  }

  generateIDs(messageId) {
    const now = new Date();
    const timestamp = now.toISOString();
    const fullId = `${messageId}_${timestamp.replace(/[:.]/g, "-")}`;
    const shortId = Date.now().toString().slice(-10);
    return { fullId, shortId, timestamp };
  }

  parseTime(timeStr) {
    const timeRegex = /^(\d+)(ms|s|m|h|d|mo|ye)$/;
    const match = timeStr.match(timeRegex);
    if (!match) return null;

    const value = parseInt(match[1]);
    const unit = match[2];

    const now = new Date();

    switch (unit) {
      case "ms":
        return value;
      case "s":
        return value * 1000;
      case "m":
        return value * 60 * 1000;
      case "h":
        return value * 60 * 60 * 1000;
      case "d":
        return value * 24 * 60 * 60 * 1000;
      case "mo": {
        const future = new Date(now);
        future.setMonth(future.getMonth() + value);
        return future.getTime() - now.getTime();
      }
      case "ye": {
        const future = new Date(now);
        future.setFullYear(future.getFullYear() + value);
        return future.getTime() - now.getTime();
      }
      default:
        return null;
    }
  }

  saveGiveaway() {
    const {
      guild_id,
      channel_id,
      message_id,
      host_id,
      prize,
      description,
      number_of_winners,
      time,
      min_members,
      max_members,
    } = this.data;

    const { fullId, shortId, timestamp } = this.generateIDs(message_id);

    const duration = this.parseTime(time);
    if (!duration) {
      console.error(`[Discord Giveaways S] invalid time format: ${time}`);
      return;
    }

    const endDate = new Date(Date.now() + duration);
    const end_timestamp = endDate.toISOString();

    let giveaways = {};

    if (fs.existsSync(this.filePath)) {
      try {
        giveaways = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
      } catch (err) {
        console.error("[Discord Giveaways S] error:", err);
      }
    }

    const giveawayData = {
      giveaway_full_id: fullId, // giveaway full id
      giveaway_id: shortId, // giveaway short id
      guild_id, //guild id
      channel_id, //channel id
      message_id, // message id
      host_id, // giveaway host id
      prize, // giveaway prize
      description, // giveaway description
      number_of_winners, // number of winners
      members: [], // members list
      winners: [], // winners list
      new_winners: [], // new winners list (rerolled winners)
      min_members, // minimum members
      max_members, // maximum members
      timestamp, // timestamp (giveaway create)
      end_timestamp, // timestamp (giveaway end)
      status: "pending", // pending / active / ended / cancelled
    };

    if (!giveaways[guild_id]) giveaways[guild_id] = [];
    giveaways[guild_id].push(giveawayData);

    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(giveaways, null, 2),
        "utf8"
      );
    } catch (err) {
      console.error("[Discord Giveaways S] error:", err);
    }
  }
}

module.exports = {
  GiveawayBuilder,
};
