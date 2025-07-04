import fs from "fs";
import path from "path";
function GiveawayLeave({ storage, giveawayId, memberId }) {
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
        const index = giveaway.participants.indexOf(memberId);
        if (index !== -1) {
            giveaway.participants.splice(index, 1);
        }
        giveaway.participantCount = giveaway.participants.length;
        fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export { GiveawayLeave };
export default {
    GiveawayLeave
};
