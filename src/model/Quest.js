import mongoose from "mongoose";
import { sqHelper, SQ_Datatypes, useVirtualId } from "../helper/database.js";

const QuestSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  create_user_id: { type: String, required: true },
  sub_quests: [
    {
      title: { type: String, required: true },
    },
  ],
});
useVirtualId(QuestSchema);

const Quest = mongoose.model("Quest", QuestSchema);

// const Quest = sqHelper.define("quest", {
//   id: {
//     type: SQ_Datatypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   title: {
//     type: SQ_Datatypes.STRING(40),
//     allowNull: false,
//   },
//   created_user_id: {
//     type: SQ_Datatypes.INTEGER,
//     allowNull: false,
//   },
// });

export default Quest;
