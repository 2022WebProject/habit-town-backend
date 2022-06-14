import { sqHelper, SQ_Datatypes } from "../helper/database.js";

const LeveledQuest = sqHelper.define("leveled_quest", {
  id: {
    type: SQ_Datatypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: SQ_Datatypes.STRING(40),
    allowNull: false,
  },
  detail: {
    type: SQ_Datatypes.TEXT,
    allowNull: true,
  },
  level_status: {
    type: SQ_Datatypes.INTEGER,
    allowNull: false,
  },
  quest_id: {
    type: SQ_Datatypes.INTEGER,
  },
});

export default LeveledQuest;
