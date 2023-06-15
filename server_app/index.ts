import { Express } from "express";
import router from "./routes";

export default async (app: Express) => {
  router(app);
};
