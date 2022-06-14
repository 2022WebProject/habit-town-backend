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
