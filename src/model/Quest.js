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
      accepted_time: { type: Date },
      memo: { type: String, required: false },
      user: { type: Object },
    },
  ],
  cleared_users: [{ user_id: { type: String }, user: { type: Object } }],
});
useVirtualId(QuestSchema);

const Quest = mongoose.model("Quest", QuestSchema);

export default Quest;
