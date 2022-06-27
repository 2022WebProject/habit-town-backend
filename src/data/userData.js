import { ObjectId } from "mongodb";
import Quest from "../model/Quest.js";
import User from "../model/User.js";
import * as QuestData from "./questData.js";

const PROGRESS_STATUS = {
  NOT_STARTED: 0,
  FAILED: -1,
  COMPLETED: 1,
};

const PROGRESS_INIT = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0,
];

const PROGRESS_INIT1 = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0,
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
        status: 3,
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
  console.log(changeIndex);
  if (changeIndex >= 0) {
    quest.progress[changeIndex] = 1;
  }
  if (changeIndex == 29) {
    quest.status = parseInt(quest.status) + 1;
    if (quest.status == 4) {
      console.log("모두 클리어!!");
      const realQuest = await QuestData.findById(quest._id);
      user.cleared_quests = [
        ...user.cleared_quests,
        { questId: questId, quest: realQuest },
      ];
      user.accepted_quests = user.accepted_quests.filter(
        (v) => v._id != questId
      );
      // await reject(user._id, questId);
      await QuestData.clear(user, questId);
      await QuestData.reject(user._id, questId);
    } else {
      quest.progress = PROGRESS_INIT;
    }
  }

  console.log(quest);
  user.save();
};
