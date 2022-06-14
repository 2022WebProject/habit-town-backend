import express from "express";
import { body } from "express-validator";
import * as questController from "../controller/questController.js";
import { authChecker } from "../helper/authHelper.js";
import { expressValidateResponse } from "../helper/validator.js";

const questValidate = [
  body("title")
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters long"),
  body("description")
    .isLength({ min: 2 })
    .withMessage("Description must be at least 2 characters long"),
  expressValidateResponse,
];

const questRouter = express.Router();

questRouter.post("/", questValidate, authChecker, questController.create);
questRouter.get("/", authChecker, questController.read);
questRouter.get("/:id", authChecker, questController.readDetail);
questRouter.post("/accept/:id", authChecker, questController.accept);

export default questRouter;
