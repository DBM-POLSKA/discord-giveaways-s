import fs from "fs";
import path from "path";
function GetGiveawayIdFromMessage({ storage, messageId }) {
    try {
        const filePath = path.resolve(storage);
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        for (const giveawayId in data) {
            if (data[giveawayId].messageId === messageId) {
                return giveawayId;
            }
        }
        return null;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export { GetGiveawayIdFromMessage };
export default {
    GetGiveawayIdFromMessage
};
