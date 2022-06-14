import Quest from "../model/Quest.js";

export const create = async (quest) => {
  return new Quest(quest).save().then((data) => data.id);
};
