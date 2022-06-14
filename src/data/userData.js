import { ObjectId } from "mongodb";
import User from "../model/User.js";

export const findByNickname = async (nickname) => {
  return User.findOne({ nickname });
};

export const findByEmail = async (email) => {
  console.log("앙");
  return User.findOne({ email });
};

export const findById = async (id) => {
  return User.findById(id);
};

export const create = async (user) => {
  return new User(user).save().then((data) => data.id);
};

export const accept = async (userId, questId, quest) => {
  return User.findByIdAndUpdate(userId, {
    $push: {
      accepted_quests: {
        _id: ObjectId(questId),
        questId: questId,
        memo: "",
        status: 1,
        sub_quests: quest.sub_quests,
      },
    },
  });
};

export const reject = async (userId, questId) => {
  return User.findByIdAndUpdate(userId, {
    $pull: {
      accepted_quests: {
        _id: ObjectId(questId),
      },
    },
  });
};
