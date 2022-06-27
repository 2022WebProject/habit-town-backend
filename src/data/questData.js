import { ObjectId } from "mongodb";
import Quest from "../model/Quest.js";

export const create = async (quest) => {
  return new Quest(quest).save().then((data) => data.id);
};

export const findById = async (id) => {
  console.log(id);
  return Quest.findById(id);
};

export const findAll = async () => {
  return Quest.find();
};

export const accept = async (userId, questId, quest) => {
  return Quest.findByIdAndUpdate(questId, {
    $push: {
      accepted_users: {
        _id: ObjectId(userId),
        user_id: userId,
      },
    },
  });
};

export const reject = async (userId, questId) => {
  return Quest.findByIdAndUpdate(questId, {
    $pull: {
      accepted_users: {
        _id: ObjectId(userId),
      },
    },
  });
};

export const clear = async (user, questId) => {
  return Quest.findByIdAndUpdate(questId, {
    $push: {
      cleared_users: {
        _id: ObjectId(user._id),
        user: user,
      },
    },
  });
};
