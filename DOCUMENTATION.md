# 🗃️ Discord Giveaways S — Documentation 🗃️
![npm](https://img.shields.io/npm/v/discord-giveaways-s)
![license](https://img.shields.io/npm/l/discord-giveaways-s)
[![GitHub](https://img.shields.io/badge/GitHub-View-blue?logo=github)](https://github.com/DBM-POLSKA/discord-giveaways-s)

## Giveaway Create
```
const { GiveawayCreate } = require("discord-giveaways-s");

const giveawayId = GiveawayCreate({
      storage: "./data/giveaways.json",
      config: {
        prize: "vip",
        duration: "1d", // 1ms/1s/1m/1h/1d/...
        winnerCount: 1, // Optional (how many people will win)
        guildId: "0000000000", // Optional
        channelId: "0000000000", // Optional
        messageId: "0000000000", // Optional
        hostId: "0000000000", // Optional
        autoStart: true, // Optional (default true) (you can enter false and start the giveaway at another time)
        description: gDescription, // Optional
        minParticipants: gMinParticipants, // Optional (default 0)
        maxParticipants: gMaxParticipants, // Optional (default unlimited)
        allowedRoles: [], // Optional
        allowedMembers: [], // Optional
        blacklistedRoles: [], // Optional
        blacklistedMembers: [], // Optional
      },
    });
```
