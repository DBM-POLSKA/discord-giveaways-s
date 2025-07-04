import fs from "fs";
import path from "path";
import parseDuration from "./functions/parse_duration.js";
function GiveawayExtend({ storage, giveawayId, time }) {
    try {
        const storagePath = path.resolve(storage);
        if (!fs.existsSync(storagePath)) {
            throw new Error(`Storage file not found at path: ${storagePath}`);
        }
        const data = JSON.parse(fs.readFileSync(storagePath, "utf8"));
        if (!data[giveawayId]) {
            throw new Error(`Giveaway with ID '${giveawayId}' does not exist.`);
        }
        const msToAdd = parseDuration(time);
        if (typeof msToAdd !== "number" || msToAdd <= 0) {
            throw new Error(`Invalid time format: ${time}`);
        }
        const giveaway = data[giveawayId];
        if (giveaway.ended) {
            throw new Error(`Cannot extend giveaway which is already ended.`);
        }
        giveaway.endTimestamp = (giveaway.endTimestamp || Date.now()) + msToAdd;
        if (giveaway.status !== "running") {
            giveaway.status = "running";
        }
        if (giveaway.ended) {
            giveaway.ended = false;
        }
        fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export { GiveawayExtend };
export default {
    GiveawayExtend
};
