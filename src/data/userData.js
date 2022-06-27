import { ObjectId } from "mongodb";
import User from "../model/User.js";

const PROGRESS_STATUS = {
  NOT_STARTED: 0,
  FAILED: -1,
  COMPLETED: 1,
};

const PROGRESS_INIT = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0,
];

export const findByNickname = async (nickname) => {
  return User.findOne({ nickname });
};

export const findByEmail = async (email) => {
  return User.findOne({ email });
};

export const findById = async (id) => {
  return User.findById(id, { password: 0 });
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
        progress: PROGRESS_INIT,
        is_cleared: false,
        last_cleared_time: null,
        // last_cleared_time: new Date("2022-06-25 12:00:00"),
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

export const clear = async (user, questId) => {
  const quest = user.accepted_quests.id(questId);

  quest.is_cleared = true;
  quest.last_cleared_time = new Date();
  const changeIndex = quest.progress.findIndex((v) => v === 0);
  if (changeIndex >= 0) {
    quest.progress[changeIndex] = 1;
  }

  user.save();
};
