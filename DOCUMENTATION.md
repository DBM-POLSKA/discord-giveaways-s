# 🗃️ Discord Giveaways S — Documentation 🗃️
![npm](https://img.shields.io/npm/v/discord-giveaways-s)
![license](https://img.shields.io/npm/l/discord-giveaways-s)
[![GitHub](https://img.shields.io/badge/GitHub-View-blue?logo=github)](https://github.com/DBM-POLSKA/discord-giveaways-s)

## Giveaway Create & Delete
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
        messageId: "0000000000", // Optional (it's worth filling out because it may be useful to obtain a giveaway ID)
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
```
const { GiveawayDelete } = require("discord-giveaways-s");

GiveawayDelete({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000", // "giveaway_id" or "all"
    });
```

## Giveaway Join & Leave
```
const { GiveawayJoin } = require("discord-giveaways-s");

GiveawayJoin({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      memberId: "0000000000",
    });
```
```
const { GiveawayLeave } = require("discord-giveaways-s");

GiveawayLeave({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      memberId: "0000000000",
    });
```

## Giveaway Edit
```
const { GiveawayEdit, GiveawayInfoFields } = require("discord-giveaways-s");

GiveawayEdit({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      edit: {
        [GiveawayInfoFields.PRIZE]: "beer",
        ...
      },
    });
```

## Giveaway Create Backup & Restore From Backup
```
const { GiveawayCreateBackup } = require("discord-giveaways-s");

GiveawayCreateBackup({
      storage: "./data/giveaways.json",
      backupPath: "./data/backup/giveaways.json",
    });
```
```
const { GiveawayRestoreFromBackup } = require("discord-giveaways-s");

GiveawayRestoreFromBackup({
      storage: "./data/giveaways.json",
      backupPath: "./data/backup/giveaways.json",
    });
```

## Check If Member In Giveaway
```
const { CheckIfMemberInGiveaway } = require("discord-giveaways-s");

const isMemberInGiveaway = CheckIfMemberInGiveaway({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      memberId: "0000000000",
    });

console.log(isMemberInGiveaway)
```

## Giveaway Draw Winner
```
const { GiveawayDrawWinner } = require("discord-giveaways-s");

const winner = GiveawayDrawWinner({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
    });

console.log(winner)
```

## Giveaway Reroll
```
const { GiveawayReroll } = require("discord-giveaways-s");

const newWinner = GiveawayReroll({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      winnerCount: 1, // optional (default it takes the value from the json file)
    });

console.log(newWinner)
```

## Giveaway Extend
```
const { GiveawayExtend } = require("discord-giveaways-s");

GiveawayExtend({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      time: "2years", // 1m / 1s / 1h / 1d / ...
    });
```

## Giveaway Info
```
const { GiveawayInfo, GiveawayInfoFields } = require("discord-giveaways-s");

const info = GiveawayInfo({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      info: GiveawayInfoFields.PRIZE,
    });

console.log(info)
```

## Giveaway Change Status
```
const { GiveawayChangeStatus, GiveawayStatusFields } = require("discord-giveaways-s");

GiveawayChangeStatus({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      newStatus: GiveawayStatusFields.PAUSED,
    });
```

## Get Giveaway Id From Message
```
const { GetGiveawayIdFromMessage } = require("discord-giveaways-s");

const giveawayId = GetGiveawayIdFromMessage({
      storage: "./data/giveaways.json",
      messageId: "0000000000",
    });
```
