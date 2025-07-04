import fs from "fs";
import path from "path";
function GiveawayDelete({ storage, giveawayId }) {
    try {
        const filePath = path.resolve(storage);
        if (!fs.existsSync(filePath)) {
            throw new Error(`Storage file not found at path: ${filePath}`);
        }
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        const isDeleteAll = giveawayId === "all" || giveawayId === "ALL";
        if (isDeleteAll) {
            fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
            return;
        }
        if (!data[giveawayId]) {
            throw new Error(`Giveaway with ID '${giveawayId}' does not exist.`);
        }
        delete data[giveawayId];
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export { GiveawayDelete };
export default {
    GiveawayDelete
};
