const { GiveawayCreate } = require("./../index");
const jsonPath = "./tests/giveaways.json";

const giveawayId = GiveawayCreate({
  storage: jsonPath,
  config: {
    prize: "vip",
    duration: "5 godzin", // 1ms/1s/1m/1h/1d/...
    winnerCount: 1, // Optional (how many people will win)
    guildId: "0000000000", // Optional
    channelId: "0000000000", // Optional
    messageId: "0000000000", // Optional (it's worth filling out because it may be useful to obtain a giveaway ID)
    hostId: "0000000000", // Optional
    autoStart: true, // Optional (default true) (you can enter false and start the giveaway at another time)
    description: "", // Optional
    minParticipants: 1, // Optional (default 0)
    maxParticipants: 50, // Optional (default unlimited)
    allowedRoles: [], // Optional
    allowedMembers: [], // Optional
    blacklistedRoles: [], // Optional
    blacklistedMembers: [], // Optional
    giveawayIdOptions: {
      idLength: 20, // optional (default 10)
      // charset: "", // optional (leave blank for default)
      prefix: "",
      suffix: "",
      separator: "",
    },
  },
});

console.log(giveawayId);
