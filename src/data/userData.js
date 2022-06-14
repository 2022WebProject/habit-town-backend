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
