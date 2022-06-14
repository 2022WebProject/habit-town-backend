import express from "express";
import { body } from "express-validator";
import { expressValidateResponse } from "../helper/validator.js";
import * as userController from "../controller/userController.js";
import { authChecker } from "../helper/authHelper.js";

const userRouter = express.Router();

const validateLogin = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  expressValidateResponse,
];

const validateSignup = [
  ...validateLogin,
  body("nickname")
    .isLength({ min: 2 })
    .withMessage("Nickname must be at least 2 characters long"),
  expressValidateResponse,
];

userRouter.post("/login", validateLogin, userController.login);
userRouter.post("/signup", validateSignup, userController.signup);

userRouter.post("/withdraw", userController.withdraw);

userRouter.get("/", authChecker, userController.me);
userRouter.get("/:id", authChecker, userController.get);
userRouter.put("/:id", authChecker, userController.put);

export default userRouter;
