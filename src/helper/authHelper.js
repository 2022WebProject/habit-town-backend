import jwt from "jsonwebtoken";
import { config } from "./envconfig.js";
import * as userRepository from "../data/userData.js";

const AUTH_ERROR = {
  message: "Authentication error",
};

export const authChecker = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json(AUTH_ERROR);
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.jwt.secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json(AUTH_ERROR);
    }
    console.log(decoded);
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id;
    next();
  });
};

export const authPasser = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return next();
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.jwt.secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json(AUTH_ERROR);
    }
    console.log(decoded);
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id;
    next();
  });
};
