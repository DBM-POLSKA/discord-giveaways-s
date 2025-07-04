/**
 * Automatically ends giveaways after their time expires.
 * Returns an EventEmitter that emits an 'ended' event with the ID of the ended giveaway.
 *
 * @param {Object} options
 * @param {string} options.storage - Path to the JSON file with giveaways
 * @param {boolean} [options.drawWinner=true] - Whether to draw winners upon ending
 * @param {number} [options.winnerCount] - Number of winners to draw; if omitted, uses value from the giveaway data
 * @param {number} [options.loopTime=5] - Interval in seconds to check giveaways
 * @returns {EventEmitter}
 */

const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");
const { GiveawayDrawWinner } = require("./giveaway_draw_winner");

function GiveawayAutoEnd({
  storage,
  drawWinner = true,
  winnerCount,
  loopTime = 5,
  loopEvent = true,
}) {
  try {
    const emitter = new EventEmitter();
    const storagePath = path.resolve(storage);

    if (!fs.existsSync(storagePath)) {
      throw new Error(`Storage file not found at path: ${storagePath}`);
    }

    function endGiveaway(id, data) {
      if (data[id].ended) return false;
      if (drawWinner) {
        const winners = GiveawayDrawWinner({
          storage,
          giveawayId: id,
          winnerCount,
        });
        data[id].winners = winners;
      }
      data[id].status = "ended";
      data[id].ended = true;
      data[id].endedBy = "auto";
      return true;
    }

    async function checkLoop() {
      while (true) {
        let endedGiveaways = [];
        try {
          const rawData = fs.readFileSync(storagePath, "utf8");
          const data = JSON.parse(rawData);
          const now = Date.now();

          for (const id in data) {
            const g = data[id];
            if (!g.ended && g.status === "running" && g.endTimestamp <= now) {
              if (endGiveaway(id, data)) {
                endedGiveaways.push(id);
              }
            }
          }

          if (endedGiveaways.length > 0) {
            fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));

            endedGiveaways.forEach((id) =>
              setImmediate(() => emitter.emit("ended", id))
            );
          }
        } catch (error) {
          emitter.emit("error", error);
        }

        if (!loopEvent && endedGiveaways.length > 0) {
          break;
        }

        await new Promise((r) => setTimeout(r, loopTime * 1000));
      }
    }

    checkLoop();

    return emitter;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  GiveawayAutoEnd,
};
