import fs from "fs";
import path from "path";
function GiveawayDrawWinner({ storage, giveawayId, winnerCount }) {
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
        const participants = giveaway.participants || [];
        if (participants.length === 0) {
            throw new Error("No participants in giveaway.");
        }
        const count = winnerCount !== undefined ? winnerCount : giveaway.winnerCount || 1;
        const participantsCopy = [...participants];
        const winners = [];
        for (let i = 0; i < count; i++) {
            if (participantsCopy.length === 0)
                break;
            const randomIndex = Math.floor(Math.random() * participantsCopy.length);
            winners.push(participantsCopy[randomIndex]);
            participantsCopy.splice(randomIndex, 1);
        }
        giveaway.winners = winners;
        fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));
        return winners;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export { GiveawayDrawWinner };
export default {
    GiveawayDrawWinner
};
