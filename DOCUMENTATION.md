<p align="center">
  <a title="discord-giveaways-s" href="https://www.npmjs.com/package/discord-giveaways-s" target="_blank">
    <img src="https://media.discordapp.net/attachments/1301409004248891443/1390133942899970199/discord-giveaways-s.png?ex=6867269f&is=6865d51f&hm=de5675e7b04f63e90d7f53c80e1d79d3d7376f4b81c944991a21ea422a3e5708&=&format=webp&quality=lossless" width="600" alt="discord-giveaways-s" />
  </a>
</p>

# 🗃️ Discord Giveaways S — Documentation 🗃️

![npm](https://img.shields.io/npm/v/discord-giveaways-s)
![license](https://img.shields.io/npm/l/discord-giveaways-s)
[![GitHub](https://img.shields.io/badge/GitHub-View-blue?logo=github)](https://github.com/DBM-POLSKA/discord-giveaways-s)

## 📋 Table of Contents

- [Giveaway Create & Delete](#giveaway-create--delete)
- [Giveaway Join & Leave](#giveaway-join--leave)
- [Giveaway Edit](#giveaway-edit)
- [Giveaway Create Backup & Restore From Backup](#giveaway-create-backup--restore-from-backup)
- [Check If Member In Giveaway](#check-if-member-in-giveaway)
- [Giveaway Draw Winner](#giveaway-draw-winner)
- [Giveaway Reroll](#giveaway-reroll)
- [Giveaway Extend](#giveaway-extend)
- [Giveaway Info](#giveaway-info)
- [Giveaway Change Status](#giveaway-change-status)
- [Get Giveaway Id From Message](#get-giveaway-id-from-message)
- [Giveaway Start](#giveaway-start)
- [Giveaway Manual End](#giveaway-manual-end)
- [Giveaway Auto End](#giveaway-auto-end)

## 🎉 Giveaway Create & Delete

With GiveawayCreate you can create a contest, assign various information to it... (this function returns the contest ID).

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
    giveawayIdOptions: {
      idLength: 20, // optional (default 10)
      charset: "", // optional (default "0123456789")
      prefix: "", // optional
      suffix: "", // optional
      separator: "", // optional
    },
  },
});
```

GiveawayDelete allows you to delete a given giveaway and the information related to it (instead of the giveaway id you can enter "all", then all giveaways will be deleted).

```js
const { GiveawayDelete } = require("discord-giveaways-s");

GiveawayDelete({
  storage: "./data/giveaways.json",
  giveawayId: "0000000000", // "giveaway_id" or "all"
});
```

## 👋 Giveaway Join & Leave

GiveawayJoin allows you to add a user (using their id) to a given giveaway.

```js
const { GiveawayJoin } = require("discord-giveaways-s");

GiveawayJoin({
  storage: "./data/giveaways.json",
  giveawayId: "0000000000",
  memberId: "0000000000",
});
```

GiveawayLeave allows a user to leave a selected giveaway via its giveaway id.

```js
const { GiveawayLeave } = require("discord-giveaways-s");

GiveawayLeave({
  storage: "./data/giveaways.json",
  giveawayId: "0000000000",
  memberId: "0000000000",
});
```

## ✏️ Giveaway Edit

GiveawayEdit allows you to edit/add various information in the selected giveaway.

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

## 💾 Giveaway Create Backup & Restore From Backup

GiveawayCreateBackup is used to create a backup copy of the selected json file to a selected location.

```js
const { GiveawayCreateBackup } = require("discord-giveaways-s");

GiveawayCreateBackup({
  storage: "./data/giveaways.json",
  backupPath: "./data/backup/giveaways.json",
});
```

GiveawayRestoreFromBackup is used to restore a backup copy of a json file.

```js
const { GiveawayRestoreFromBackup } = require("discord-giveaways-s");

GiveawayRestoreFromBackup({
  storage: "./data/giveaways.json",
  backupPath: "./data/backup/giveaways.json",
});
```

## 🔍 Check If Member In Giveaway

CheckIfMemberInGiveaway is used to check whether a given user is participating in a selected giveaway (returns true/false depending on whether the user is participating in the giveaway).

```js
const { CheckIfMemberInGiveaway } = require("discord-giveaways-s");

const isMemberInGiveaway = CheckIfMemberInGiveaway({
  storage: "./data/giveaways.json",
  giveawayId: "0000000000",
  memberId: "0000000000",
});

console.log(isMemberInGiveaway);
```

## 🏆 Giveaway Draw Winner

GiveawayDrawWinner is used to manually draw winners from a selected giveaway.

```js
const { GiveawayDrawWinner } = require("discord-giveaways-s");

const winner = GiveawayDrawWinner({
  storage: "./data/giveaways.json",
  giveawayId: "0000000000",
});

console.log(winner);
```

## 🏆 Giveaway Reroll

GiveawayReroll is used to re-draw the giveaway winner, you can also set how many people are to be drawn.

```js
const { GiveawayReroll } = require("discord-giveaways-s");

const newWinner = GiveawayReroll({
  storage: "./data/giveaways.json",
  giveawayId: "0000000000",
  winnerCount: 1, // optional (default it takes the value from the json file)
});

console.log(newWinner);
```

## ⏳ Giveaway Extend

With GiveawayExtend you can extend the duration of your giveaway.

```js
const { GiveawayExtend } = require("discord-giveaways-s");

GiveawayExtend({
  storage: "./data/giveaways.json",
  giveawayId: "0000000000",
  time: "1h", // 1ms/1s/1m/1h/1d/...
});
```

## 📊 Giveaway Info

With GiveawayInfo you can retrieve various information from a selected giveaway, (GiveawayInfoField is here to help you with this).

```js
const { GiveawayInfo, GiveawayInfoFields } = require("discord-giveaways-s");

const info = GiveawayInfo({
  storage: "./data/giveaways.json",
  giveawayId: "0000000000",
  info: GiveawayInfoFields.PRIZE,
});

console.log(info);
```

## ⚙️ Giveaway Change Status

GiveawayChangeStatus is used to change the giveaway status (ended/running/waiting...), you can also make the configuration easier via GiveawayStatusFields.

```js
const {
  GiveawayChangeStatus,
  GiveawayStatusFields,
} = require("discord-giveaways-s");

GiveawayChangeStatus({
  storage: "./data/giveaways.json",
  giveawayId: "0000000000",
  newStatus: GiveawayStatusFields.PAUSED,
});
```

## #️⃣ Get Giveaway Id From Message

Using GetGiveawayIdFromMessage you can retrieve the giveaway id via the message id assigned to that giveaway (this is useful when you don't have access to the giveaway id but you do have access to the message id).

```js
const { GetGiveawayIdFromMessage } = require("discord-giveaways-s");

const giveawayId = GetGiveawayIdFromMessage({
  storage: "./data/giveaways.json",
  messageId: "0000000000",
});
```

## ▶️ Giveaway Start

GiveawayStart allows you to manually start a selected giveaway.

```js
const { GiveawayStart } = require("discord-giveaways-s");

GiveawayStart({
  storage: "./data/giveaways.json",
  giveawayId: "0000000000",
});
```

## ⏹️ Giveaway Manual End

Using GiveawayManualEnd you can end your chosen giveaway and draw the winners at the same time.

```js
const { GiveawayManualEnd } = require("discord-giveaways-s");

GiveawayManualEnd({
  storage: "./data/giveaways.json",
  giveawayId: "0000000000",
  drawWinner: true, // optional (default true)
  winnerCount: 1, // optional (default it takes the value from the json file)
});
```

## ⏰ Giveaway Auto End

GiveawayAutoEnd is an event that fires when a giveaway ends and executes the code and returns the ID of the giveaway that ended.

```js
const { GiveawayAutoEnd } = require("discord-giveaways-s");

const giveawayChecker = GiveawayAutoEnd({
  storage: "./data/giveaways.json",
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
