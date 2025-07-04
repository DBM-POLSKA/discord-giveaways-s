import fs from "fs";
import path from "path";
function GiveawayRestoreFromBackup({ storage, backupPath }) {
    try {
        const storagePath = path.resolve(storage);
        const backupPathResolved = path.resolve(backupPath);
        if (!fs.existsSync(backupPathResolved)) {
            throw new Error(`Backup file not found at: ${backupPathResolved}`);
        }
        fs.copyFileSync(backupPathResolved, storagePath);
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export { GiveawayRestoreFromBackup };
export default {
    GiveawayRestoreFromBackup
};
