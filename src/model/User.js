import mongoose from "mongoose";
import { sqHelper, SQ_Datatypes, useVirtualId } from "../helper/database.js";

const UserSchema = mongoose.Schema({
  // id: { type: String, required: true },
  email: { type: String, required: true },
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  introduce: String,
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

// export const User = sqHelper.define("user", {
//   id: {
//     type: SQ_Datatypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   nickname: {
//     type: SQ_Datatypes.STRING(40),
//     allowNull: false,
//   },
//   password: {
//     type: SQ_Datatypes.STRING(128),
//     allowNull: false,
//   },
//   introduce: {
//     type: SQ_Datatypes.STRING(200),
//     allowNull: true,
//   },
//   login_type: {
//     type: SQ_Datatypes.STRING(20),
//   },
//   accepted_quest_id: {
//     type: SQ_Datatypes.INTEGER,
//     allowNull: true,
//   },
// });

export default User;
