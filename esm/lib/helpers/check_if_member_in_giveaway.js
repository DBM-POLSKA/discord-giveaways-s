import fs from "fs";
import path from "path";
function CheckIfMemberInGiveaway({ storage, giveawayId, memberId }) {
    try {
        const storagePath = path.resolve(storage);
        if (!fs.existsSync(storagePath)) {
            throw new Error(`Storage file not found at path: ${storagePath}`);
        }
        const data = JSON.parse(fs.readFileSync(storagePath, "utf8"));
        if (!data[giveawayId]) {
            throw new Error(`Giveaway with ID '${giveawayId}' does not exist.`);
        }
        const participants = data[giveawayId].participants || [];
        return participants.includes(memberId);
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export { CheckIfMemberInGiveaway };
export default {
    CheckIfMemberInGiveaway
};
