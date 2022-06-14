import { sqHelper, SQ_Datatypes } from "../helper/database.js";

const LeveledQuestUser = sqHelper.define("leveled_quest_user", {
  id: {
    type: SQ_Datatypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: SQ_Datatypes.INTEGER,
    allowNull: false,
  },
  success_count: {
    type: SQ_Datatypes.INTEGER,
    allowNull: false,
  },
  memo: {
    type: SQ_Datatypes.TEXT,
    allowNull: true,
  },
});

export default LeveledQuestUser;
