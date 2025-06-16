# Info
The **discord-giveaways-s** module is compatible with discord.js v13 and v14.

# Installation
Use NPM <br>
`npm install discord-giveaways-s`

# Giveaway Create
In message id you need to enter the message id (giveaway message id), then this message can be edited but it is needed to generate the giveaway id.
```
const { GiveawayBuilder } = require("discord-giveaways-s");

let jsonPath = "giveaways.json";

new GiveawayBuilder(jsonPath, {
  guild_id: 123456789, // optional
  channel_id: 123456789, // optional
  message_id: 123456789, // Required to generate giveaway ID!
  host_id: 123456789, // optional
  prize: "vip",
  description: "test", // optional
  time: "1d", // 1ms / 1s / 1m / 1h / 1d / 1mo / 1ye
  number_of_winners: 1,
  min_members: 1, // optional
  max_members: 5, // optional
});
```

# Giveaway Delete
Use this to delete a selected giveaway. Instead of entering the giveaway id you can enter all (this will delete all giveaways).
```
const { GiveawayDelete } = require("discord-giveaways-s");

let jsonPath = "giveaways.json";

new GiveawayDelete(jsonPath, {
  giveaway_id: "123456789",
});
```

# Giveaway Join / Leave
Using this, the user can join or leave the giveaway.
```
const { GiveawayJoin } = require("discord-giveaways-s");

let jsonPath = "giveaways.json";

new GiveawayJoin(jsonPath, {
  giveaway_id: "123456789",
  member_id: 123456789,
});
```
or
```
const { GiveawayLeave } = require("discord-giveaways-s");

let jsonPath = "giveaways.json";

new GiveawayLeave(jsonPath, {
  giveaway_id: "123456789",
  member_id: 123456789,
});
```

# Giveaway Reroll
Use this to randomly select new giveaway winners. (if you leave members blank, the number of users that are set by default in the giveaway will be randomly selected).
```
const { GiveawayReroll } = require("discord-giveaways-s");

let jsonPath = "giveaways.json";

new GiveawayReroll(jsonPath, {
  giveaway_id: "123456789",
  members: 1,
});
```
or
```
const { GiveawayReroll } = require("discord-giveaways-s");

let jsonPath = "giveaways.json";

new GiveawayReroll(jsonPath, {
  giveaway_id: "123456789",
});
```

# Giveaway Check Member
using this you can check if a given user is in a given giveaway.
```
const { GiveawayCheckMember } = require("discord-giveaways-s");

let jsonPath = "giveaways.json";

const checker = new GiveawayCheckMember(jsonPath, {
  giveaway_id: "123456789",
  member_id: "123456789",
});

console.log(checker.result); // true / false
```

# Giveaway Info
This allows you to check various information about the selected giveaway.
```
const { GiveawayInfo } = require("discord-giveaways-s");

let jsonPath = "giveaways.json";

const info = new GiveawayInfo(jsonPath, {
  giveaway_id: "123456789",
  info: "prize",
});

console.log(info.result);
```
Displays all information about the selected giveaway.
```
const { GiveawayInfo } = require("discord-giveaways-s");

let jsonPath = "giveaways.json";

const info = new GiveawayInfo(jsonPath, {
  giveaway_id: "123456789",
});

console.log(info.result);
```
Displays all information about all giveaways.
```
const { GiveawayInfo } = require("discord-giveaways-s");

let jsonPath = "giveaways.json";

const info = new GiveawayInfo(jsonPath, {});

console.log(info.result);
```

# Giveaway Start
Used to start a giveaway (changes the giveaway status to active).
```
const { GiveawayStart } = require("discord-giveaways-s");

let jsonPath = "giveaways.json";

new GiveawayStart(jsonPath, {
  giveaway_id: "123456789",
});
```

# Giveaway Manually End
Use to manually end a giveaway.
```
const { GiveawayEnd } = require("discord-giveaways-s");

let jsonPath = "giveaways.json";

new GiveawayEnd(jsonPath, {
  giveaway_id: "123456789",
});
```

# Giveaway Auto End
Use to automatically end the giveaway.
```
const { GiveawayMonitor, GiveawayEnd, GiveawayInfo } = require("discord-giveaways-s");

let jsonPath = "giveaways.json";

const monitor = new GiveawayMonitor(jsonPath, 1000, (gId) => {
  new GiveawayEnd(jsonPath, {
    giveaway_id: id,
  });
  console.log(`Giveaway ${gId} successfully ended!`);

  const info = new GiveawayInfo(jsonPath, {
    giveaway_id: gId,
    info: "winners",
  });

  console.log(`Winners: ${info.result}`);
});

monitor.start();
```

# Giveaway Giveaway ID From Interaction
This can be used to obtain a giveaway id via interaction, e.g. with a button or select menu.
```
const { GiveawayIdFromInteraction } = require("discord-giveaways-s");

let jsonPath = "giveaways.json";

let interaction = interaction;

const giveawayId = new GiveawayIdFromInteraction(jsonPath, {
  interaction: interaction,
});

console.log(`Giveaway id: ${giveawayId.result}`);
```

# All Functions
- GiveawayBuilder
- GiveawayJoin
- GiveawayLeave
- GiveawayStart
- GiveawayEnd
- GiveawayDelete
- GiveawayReroll
- GiveawayInfo
- GiveawayCheckMember
- GiveawayIdFromInteraction
- GiveawayMonitor
