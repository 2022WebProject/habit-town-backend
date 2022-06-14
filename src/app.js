import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";
import { config } from "./helper/envconfig.js";
import userRouter from "./router/userRouter.js";
import questRouter from "./router/QuestRouter.js";
import { connectDB } from "./helper/database.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));

app.use("/user", userRouter);
app.use("/quest", questRouter);

connectDB()
  .then((db) => {
    console.log("init!!");
    app.listen(config.host.port);
  })
  .catch(console.error);
