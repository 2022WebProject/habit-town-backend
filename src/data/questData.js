import { ObjectId } from "mongodb";
import Quest from "../model/Quest.js";
import User from "../model/User.js";

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

export const accept = async (userId, questId, quest, user) => {
  return Quest.findByIdAndUpdate(questId, {
    $push: {
      accepted_users: {
        _id: ObjectId(userId),
        user_id: userId,
        accepted_time: new Date(),
        memo: "",
        user: user,
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

export const editMemo = async (quest, user, userId, memo) => {
  user.accepted_quests = user.accepted_quests.map((v) => {
    if (v.id === quest.id) {
      v.memo = memo;
    }
    return v;
  });
  quest.accepted_users = quest.accepted_users.map((v) => {
    if (v.id === userId) {
      v.memo = memo;
    }
    return v;
  });
  console.log(quest);
  quest.save();

  user.save();
};
