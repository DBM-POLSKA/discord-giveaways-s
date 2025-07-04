import fs from "fs";
import path from "path";
function GiveawayJoin({ storage, giveawayId, memberId }) {
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
        if (giveaway.maxParticipants !== null &&
            giveaway.participantCount >= giveaway.maxParticipants) {
            return false;
        }
        if (!giveaway.participants.includes(memberId)) {
            giveaway.participants.push(memberId);
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
export { GiveawayJoin };
export default {
    GiveawayJoin
};
