import { Express } from "express";
import modules from "../modules";
import router from "./routes";
import { Server } from "http";

export default async (app: Express): Promise<Server> => {
  let httpServer = await modules.initialize(app);

  router(app);

  return httpServer;
};
