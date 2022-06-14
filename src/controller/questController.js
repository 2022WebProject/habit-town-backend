import * as questData from "../data/questData.js";

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
export const read = (req, res, next) => {
  res.json("아이고");
};
export const readDetail = (req, res, next) => {};
export const accept = (req, res, next) => {};
