import * as questData from "../data/questData.js";
import * as userData from "../data/userData.js";

export const create = async (req, res, next) => {
  const { title, description, sub_quests } = req.body;
  if (sub_quests.length != 3) {
    return res.status(400).json({ message: "sub_quests를 모두 입력하세요" });
  }
  console.log(req.body);

  const questId = await questData.create({
    ...req.body,
    create_user_id: req.userId,
  });
  console.log(questId);
  if (!questId) {
    return res.status(500).json({ message: "생성에 실패했습니다" });
  }
  res.status(201).json({ message: "success" });
};

// 여기 퀘스트 불러오기부분
export const read = async (req, res, next) => {
  const quests = await questData.findAll();
  const retQuests = quests.filter(
    (item) => !item.accepted_users.find((user) => user.user_id == req.userId)
  );

  // TODO 여기서 퀘스트 수락 마지막 날자를 비교해서 동기화 해야함.

  res.status(200).json({ data: retQuests });
};

// 여기 퀘스트 상세 불러오기 부분
export const readDetail = async (req, res, next) => {
  const { id } = req.params;
  const quest = await questData.findById(id);
  if (!quest) {
    res.status(404).json({ message: "존재하지 않는 퀘스트입니다" });
  }
  res.status(200).json({ data: quest });
};

// 여기는 내꺼~
export const accept = async (req, res, next) => {
  const { quest_id } = req.body;
  const quest = await questData.findById(quest_id);
  console.log(quest);
  const user = await userData.findById(req.userId);
  if (!quest) {
    return res.status(404).json({ message: "존재하지 않는 퀘스트입니다" });
  }
  if (isUserInQuest(user, quest)) {
    await userData.reject(req.userId, quest_id);
    await questData.reject(req.userId, quest_id);
    return res.status(201).json({ message: "퀘스트를 그만뒀습니다." });
    // return res.status(400).json({ message: "이미 수락한 퀘스트입니다" });
  }
  if (user.accepted_quests.length >= 3) {
    return res
      .status(400)
      .json({ message: "퀘스트는 3개까지 수락할 수 있습니다." });
  }
  await userData.accept(req.userId, quest_id, quest);
  await questData.accept(req.userId, quest_id, quest);
  res.status(200).json({ message: "수락하였습니다." });
};

export const clear = async (req, res, next) => {
  const { quest_id } = req.body;
  const quest = await questData.findById(quest_id);
  const user = await userData.findById(req.userId);
  if (!quest) {
    return res.status(404).json({ message: "존재하지 않는 퀘스트입니다" });
  }
  if (isUserInQuest(user, quest)) {
    // 퀘스트를 클리어 해야함..
    await userData.clear(user, quest_id);
  }
  res.status(200).json({ message: "완료했습니다." });
};

const isUserInQuest = (user, quest) => {
  return user.accepted_quests.find((user_quest) => user_quest.id === quest.id);
};
