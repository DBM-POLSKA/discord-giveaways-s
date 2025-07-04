import fs from "fs";
import path from "path";
function GiveawayInfo({ storage, giveawayId, info }) {
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
        if (!(info in giveaway)) {
            return null;
        }
        return giveaway[info];
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export { GiveawayInfo };
export default {
    GiveawayInfo
};
