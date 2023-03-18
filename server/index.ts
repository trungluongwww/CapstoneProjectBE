import { Express } from "express";
import modules from "../modules";
import router from "./routes";

export default async (app: Express) => {
  await modules.initialize(app);

  router(app);
};
