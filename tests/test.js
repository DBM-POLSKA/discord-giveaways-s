const {
  GiveawayBuilder,
  GiveawayJoin,
  GiveawayLeave,
  GiveawayStart,
  GiveawayEnd,
  GiveawayDelete,
  GiveawayReroll,
  GiveawayInfo,
  GiveawayCheckMember,
  GiveawayIdFromInteraction,
  GiveawayMonitor,
} = require("../lib/index");

let jsonPath = "giveaways.json";

//const monitor = new GiveawayMonitor(jsonPath, 1000, (id) => {
//  console.log(`Zakończono giveaway: ${id}`);
//});
//monitor.start();

//const giveawayId = new GiveawayIdFromInteraction(jsonPath, {
//  interaction: interaction,
//});
//console.log(giveawayId.result);

//const checker = new GiveawayCheckMember(jsonPath, {
//  giveaway_id: "0030530188",
//  member_id: "111111111",
//});
//console.log(checker.result);

//const test = new GiveawayInfo(jsonPath, {
//  giveaway_id: "0030530188",
//  info: "prize",
//});
//console.log(test.result);

// new GiveawayReroll(jsonPath, {
//  giveaway_id: "0030530188",
//  members: 1,
//});

//new GiveawayDelete(jsonPath, {
//  giveaway_id: "0030530188",
//});

//new GiveawayEnd(jsonPath, {
//  giveaway_id: "0030530188",
//});

//new GiveawayStart(jsonPath, {
//  giveaway_id: "0030530188",
//});

// new GiveawayJoin(jsonPath, {
//  giveaway_id: "0030530188",
//  member_id: 222222222,
//});

// new GiveawayLeave(jsonPath, {
//  giveaway_id: "0030530188",
//  member_id: 222222222,
//});

// new GiveawayBuilder(jsonPath, {
//  guild_id: 1131111111,
//  channel_id: 222222222,
//  message_id: 333333333,
//  host_id: 444444444,
//  prize: "vip",
//  description: "opis",
//  time: "1d",
//  number_of_winners: 1,
//  min_members: 1,
//  max_members: 5,
//});
