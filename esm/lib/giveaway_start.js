import fs from "fs";
import path from "path";
function GiveawayStart({ storage, giveawayId }) {
    try {
        const storagePath = path.resolve(storage);
        if (!fs.existsSync(storagePath)) {
            throw new Error(`Storage file not found at path: ${storagePath}`);
        }
        const data = JSON.parse(fs.readFileSync(storagePath, "utf8"));
        if (!data[giveawayId]) {
            throw new Error(`Giveaway with ID '${giveawayId}' does not exist.`);
        }
        data[giveawayId].status = "running";
        data[giveawayId].ended = false;
        fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export { GiveawayStart };
export default {
    GiveawayStart
};
