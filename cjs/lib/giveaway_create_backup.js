/**
 * Creates a backup copy of the giveaway JSON file.
 *
 * @param {Object} options
 * @param {string} options.storage - Path to the original giveaway JSON file
 * @param {string} options.backupPath - Path where the backup file will be saved
 * @throws {Error} if the storage file does not exist or the copy operation fails
 * @returns {boolean} true if the backup was created successfully
 */

const fs = require("fs");
const path = require("path");

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
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  GiveawayCreateBackup,
};
