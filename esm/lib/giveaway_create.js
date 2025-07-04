import fs from "fs";
import path from "path";
import generateGiveawayId from "./functions/generate_giveaway_id.js";
import parseDuration from "./functions/parse_duration.js";
import createGiveawayTemplate from "./functions/json_file_template.js";
function GiveawayCreate({ storage, config }) {
    try {
        if (!config?.prize)
            throw new Error("config.prize is required!");
        if (!config?.duration)
            throw new Error("config.duration is required!");
        const storagePath = path.resolve(storage);
        if (!fs.existsSync(storagePath)) {
            fs.writeFileSync(storagePath, JSON.stringify({}, null, 2));
        }
        const data = JSON.parse(fs.readFileSync(storagePath, "utf8"));
        const idOpts = config.giveawayIdOptions || {};
        const fullOpts = config.giveawayFullIdOptions || {};
        const { giveawayId, giveawayFullId } = generateGiveawayId({
            giveawayIdOptions: idOpts,
            giveawayFullIdOptions: fullOpts,
        });
        const now = Date.now();
        const ms = parseDuration(config.duration);
        if (ms === null)
            throw new Error("Invalid duration format!");
        const newGiveaway = createGiveawayTemplate({ giveawayId, giveawayFullId, now, durationMs: ms }, config);
        data[giveawayId] = newGiveaway;
        fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));
        return giveawayId;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export { GiveawayCreate };
export default {
    GiveawayCreate
};
