import fs from "fs";
import path from "path";
function GiveawayCreateBackup({ storage, backupPath }) {
    try {
        const storagePath = path.resolve(storage);
        const backupFullPath = path.resolve(backupPath);
        if (!fs.existsSync(storagePath)) {
            throw new Error(`Storage file not found at path: ${storagePath}`);
        }
        const backupDir = path.dirname(backupFullPath);
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }
        fs.copyFileSync(storagePath, backupFullPath);
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export { GiveawayCreateBackup };
export default {
    GiveawayCreateBackup
};
