const fs = require("fs");
const path = require("path");

/**
 * Restores the giveaway backup by copying the file from backupPath to storage.
 *
 * @param {Object} options
 * @param {string} options.storage - Path where the giveaway data should be restored to.
 * @param {string} options.backupPath - Path to the backup JSON file.
 * @throws {Error} if backup file does not exist or can't be copied.
 */
function GiveawayRestoreFromBackup({ storage, backupPath }) {
  try {
    const storagePath = path.resolve(storage);
    const backupPathResolved = path.resolve(backupPath);

    if (!fs.existsSync(backupPathResolved)) {
      throw new Error(`Backup file not found at: ${backupPathResolved}`);
    }

    fs.copyFileSync(backupPathResolved, storagePath);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  GiveawayRestoreFromBackup,
};
