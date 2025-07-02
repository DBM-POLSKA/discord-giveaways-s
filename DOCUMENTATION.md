# 🗃️ Discord Giveaways S — Documentation 🗃️
![npm](https://img.shields.io/npm/v/discord-giveaways-s)
![license](https://img.shields.io/npm/l/discord-giveaways-s)
[![GitHub](https://img.shields.io/badge/GitHub-View-blue?logo=github)](https://github.com/DBM-POLSKA/discord-giveaways-s)


## Table of Contents
- [Giveaway Create & Delete](#giveaway-create--delete)
- [Giveaway Join & Leave](#giveaway-join--leave)
- [Giveaway Edit](#giveaway-edit)


## Giveaway Create & Delete
```js
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
        description: "", // Optional
        minParticipants: 1, // Optional (default 0)
        maxParticipants: 50, // Optional (default unlimited)
        allowedRoles: [], // Optional
        allowedMembers: [], // Optional
        blacklistedRoles: [], // Optional
        blacklistedMembers: [], // Optional
      },
    });
```
```js
const { GiveawayDelete } = require("discord-giveaways-s");

    GiveawayDelete({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000", // "giveaway_id" or "all"
    });
```

## Giveaway Join & Leave
```js
const { GiveawayJoin } = require("discord-giveaways-s");

    GiveawayJoin({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      memberId: "0000000000",
    });
```
```js
const { GiveawayLeave } = require("discord-giveaways-s");

    GiveawayLeave({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      memberId: "0000000000",
    });
```

## Giveaway Edit
```js
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
```js
const { GiveawayCreateBackup } = require("discord-giveaways-s");

    GiveawayCreateBackup({
      storage: "./data/giveaways.json",
      backupPath: "./data/backup/giveaways.json",
    });
```
```js
const { GiveawayRestoreFromBackup } = require("discord-giveaways-s");

    GiveawayRestoreFromBackup({
      storage: "./data/giveaways.json",
      backupPath: "./data/backup/giveaways.json",
    });
```

## Check If Member In Giveaway
```js
const { CheckIfMemberInGiveaway } = require("discord-giveaways-s");

    const isMemberInGiveaway = CheckIfMemberInGiveaway({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      memberId: "0000000000",
    });

console.log(isMemberInGiveaway)
```

## Giveaway Draw Winner
```js
const { GiveawayDrawWinner } = require("discord-giveaways-s");

    const winner = GiveawayDrawWinner({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
    });

console.log(winner)
```

## Giveaway Reroll
```js
const { GiveawayReroll } = require("discord-giveaways-s");

    const newWinner = GiveawayReroll({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      winnerCount: 1, // optional (default it takes the value from the json file)
    });

console.log(newWinner)
```

## Giveaway Extend
```js
const { GiveawayExtend } = require("discord-giveaways-s");

    GiveawayExtend({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      time: "1h", // 1ms/1s/1m/1h/1d/...
    });
```

## Giveaway Info
```js
const { GiveawayInfo, GiveawayInfoFields } = require("discord-giveaways-s");

    const info = GiveawayInfo({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      info: GiveawayInfoFields.PRIZE,
    });

console.log(info)
```

## Giveaway Change Status
```js
const { GiveawayChangeStatus, GiveawayStatusFields } = require("discord-giveaways-s");

    GiveawayChangeStatus({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      newStatus: GiveawayStatusFields.PAUSED,
    });
```

## Get Giveaway Id From Message
```js
const { GetGiveawayIdFromMessage } = require("discord-giveaways-s");

    const giveawayId = GetGiveawayIdFromMessage({
      storage: "./data/giveaways.json",
      messageId: "0000000000",
    });
```

## Giveaway Start
```js
const { GiveawayStart } = require("discord-giveaways-s");

    GiveawayStart({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
    });
```

## Giveaway Manual End
```js
const { GiveawayManualEnd } = require("discord-giveaways-s");

    GiveawayManualEnd({
      storage: "./data/giveaways.json",
      giveawayId: "0000000000",
      drawWinner: true, // optional (default true)
      winnerCount: 1, // optional (default it takes the value from the json file)
    });
```

## Giveaway Auto End
```js
const { GiveawayAutoEnd } = require("discord-giveaways-s");

    const giveawayChecker = GiveawayAutoEnd({
      storage: "./giveaways.json",
      drawWinner: true, // optional (default true)
      winnerCount: 1, // optional (default it takes the value from the json file)
      loopTime: 5, // optional (default 5) (here you set how often the json file should be checked for completed giveaways)
      loopEvent: false, // optional (default true) (when true this event loops)
    });

    giveawayChecker.on("ended", (giveawayId) => {
      console.log("The giveaway has ended:", giveawayId);
    });

    giveawayChecker.on("error", (error) => {
      console.error(error);
    });
```
