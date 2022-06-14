import mongoose from "mongoose";
import { sqHelper, SQ_Datatypes, useVirtualId } from "../helper/database.js";

const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  introduce: String,
  success_quest_count: { type: Number, default: 0 },
  accepted_quests: [
    {
      quiest_id: { type: Number, required: true },
      memo: { type: String, required: false },
      status: { type: Number, require: true },
      sub_quests: [
        {
          title: { type: String, required: true },
        },
      ],
    },
  ],
});
useVirtualId(UserSchema);

const User = mongoose.model("User", UserSchema);

export default User;
