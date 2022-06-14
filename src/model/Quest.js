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
  accepted_users: [
    {
      user_id: { type: String },
    },
  ],
});
useVirtualId(QuestSchema);

const Quest = mongoose.model("Quest", QuestSchema);

export default Quest;
