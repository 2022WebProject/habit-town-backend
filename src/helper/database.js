import SQ from "sequelize";
import { config } from "./envconfig.js";
import MongoDB from "mongodb";
import Mongoose from "mongoose";

const { host, user, database, password } = config.db;

export const SQ_Datatypes = SQ.DataTypes;
export const SQ_Sequlize = SQ.Sequelize;

export const sqHelper = new SQ.Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  //   logging: false,
});

export async function connectDB() {
  return Mongoose.connect(config.db.host, {
    useNewURlParser: true,
    useUnifiedTopology: true,
  });
}

export function useVirtualId(Schema) {
  Schema.virtual("id").get(function () {
    return this._id.toString();
  });
  Schema.set("toJSON", { virtuals: true });
  Schema.set("toObject", { virtuals: true });
}
