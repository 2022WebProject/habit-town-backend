import LeveledQuest from "../model/LeveledQuest.js";
import LeveledQuestUser from "../model/LeveledQuestUser.js";
import Quest from "../model/Quest.js";
import User from "../model/User.js";

// User.belongsToMany(LeveledQuest, {
//   through: LeveledQuestUser,
//   foreignKey: "user_id",
// });
// User.belongsToMany(Quest, {
//   through: "user_quest_accept",
//   foreignKey: "user_id",
// });

// Quest.belongsTo(User, {
//   foreignKey: "created_user_id",
// });
// Quest.belongsToMany(User, {
//   through: "user_quest_accept",
//   foreignKey: "quest_id",
// });

// LeveledQuest.belongsTo(Quest, {
//   foreignKey: "quest_id",
// });
// LeveledQuest.belongsToMany(User, {
//   through: LeveledQuestUser,
//   foreignKey: "leveled_quest_id",
// });
