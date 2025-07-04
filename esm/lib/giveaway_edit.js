import fs from "fs";
import path from "path";
function GiveawayEdit({ storage, giveawayId, edit }) {
    try {
        const storagePath = path.resolve(storage);
        if (!fs.existsSync(storagePath)) {
            throw new Error(`Storage file not found at path: ${storagePath}`);
        }
        const data = JSON.parse(fs.readFileSync(storagePath, "utf8"));
        if (!data[giveawayId]) {
            throw new Error(`Giveaway with ID '${giveawayId}' does not exist.`);
        }
        Object.keys(edit).forEach((key) => {
            data[giveawayId][key] = edit[key];
        });
        fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export { GiveawayEdit };
export default {
    GiveawayEdit
};
