import crypto from "crypto";
function generateGiveawayId({ giveawayIdOptions = {}, giveawayFullIdOptions = {}, } = {}) {
    try {
        const { idLength = 10, charset = "0123456789", prefix: shortPrefix = "", suffix: shortSuffix = "", separator: shortSeparator = "", } = giveawayIdOptions;
        const { prefix: fullPrefix = "giveaway", suffix: fullSuffix = "", separator: fullSeparator = "_", randomBytesLength = 4, } = giveawayFullIdOptions;
        let randomId = "";
        for (let i = 0; i < idLength; i++) {
            randomId += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        const idParts = [];
        if (shortPrefix)
            idParts.push(shortPrefix);
        idParts.push(randomId);
        if (shortSuffix)
            idParts.push(shortSuffix);
        const giveawayId = idParts.join(shortSeparator);
        const timestamp = Date.now();
        const randomPart = crypto.randomBytes(randomBytesLength).toString("hex");
        const fullParts = [];
        if (fullPrefix)
            fullParts.push(fullPrefix);
        fullParts.push(giveawayId, String(timestamp), randomPart);
        if (fullSuffix)
            fullParts.push(fullSuffix);
        const giveawayFullId = fullParts.join(fullSeparator);
        return { giveawayId, giveawayFullId, timestamp };
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export default generateGiveawayId;
