import express from "express";
import * as questController from "../controller/questController.js";

const questRouter = express.Router();

questRouter.post("/", questController.create);
questRouter.get("/", questController.read);
questRouter.get("/:id", questController.readDetail);
questRouter.post("/accept/:id", questController.accept);

export default questRouter;
