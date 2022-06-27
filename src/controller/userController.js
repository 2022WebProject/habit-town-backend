import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../helper/envconfig.js";
import * as userRepository from "../data/userData.js";
import moment from "moment";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userRepository.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "invaled email or password" });
  }
  // 패스워드 검증
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "invaled email or password" });
  }
  // 토큰 생성
  const token = createJwtToken(user.id);
  res.status(200).json({ token, nickname: user.nickname, id: user.id });
};

export const signup = async (req, res, next) => {
  const { email, password, nickname } = req.body;
  const found = await userRepository.findByEmail(email);
  if (found) {
    return res.status(409).json({ message: `${email} already exists` });
  }
  // encoding password
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(config.bcrypt.saltRounds)
  );
  const userId = await userRepository.create({
    nickname,
    password: hashedPassword,
    email,
    accepted_quests: [],
    introduce: "",
    cleared_quests: [],
  });

  const token = createJwtToken(userId);
  //   console.log("user", user);

  return res.status(201).json({ token, nickname, id: userId });
};

export const withdraw = (req, res, next) => {};

export const me = async (req, res, next) => {
  const id = req.userId;
  const user = await userRepository.findById(id);
  for (let i = 0; i < user.accepted_quests.length; i++) {
    const quest = user.accepted_quests[i];
    const lastClearedTimeDiff = moment()
      .startOf("day")
      .diff(moment(quest.last_cleared_time).startOf("day"), "days");

    console.log(lastClearedTimeDiff);
    if (lastClearedTimeDiff > 1) {
      // 2일이상 안온경우 fail을 넣어준다.
      const changeIndex = quest.progress.findIndex((v) => v === 0);
      if (changeIndex >= 0) {
        for (let j = 0; j < lastClearedTimeDiff - 1; j++) {
          quest.progress[changeIndex] = -1;
        }
        quest.last_cleared_time = new Date();
      }
    } else if (lastClearedTimeDiff == 1) {
      // 1일이 지난경우 다시 완료를 할 수 있도록 해준다.
      quest.is_cleared = false;
      console.log("dmdkdk");
    }

    await user.save();
  }
  return res.status(200).json(user);
};

export const get = (req, res, next) => {};
export const put = (req, res, next) => {};

const createJwtToken = (id) => {
  const token = jwt.sign({ id: id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresIn,
  });
  return token;
};
