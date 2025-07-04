import fs from "fs";
import path from "path";
import { GiveawayDrawWinner } from "./giveaway_draw_winner.js";
function GiveawayManualEnd({ storage, giveawayId, drawWinner = true, winnerCount, }) {
    try {
        const storagePath = path.resolve(storage);
        if (!fs.existsSync(storagePath)) {
            throw new Error(`Storage file not found at path: ${storagePath}`);
        }
        const data = JSON.parse(fs.readFileSync(storagePath, "utf8"));
        if (!data[giveawayId]) {
            throw new Error(`Giveaway with ID '${giveawayId}' does not exist.`);
        }
        const giveaway = data[giveawayId];
        giveaway.status = "ended";
        giveaway.ended = true;
        giveaway.endedBy = "manual";
        let winners = null;
        if (drawWinner) {
            winners = GiveawayDrawWinner({
                storage,
                giveawayId,
                winnerCount,
            });
            giveaway.winners = winners;
        }
        fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));
        return drawWinner ? winners : true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export { GiveawayManualEnd };
export default {
    GiveawayManualEnd
};
