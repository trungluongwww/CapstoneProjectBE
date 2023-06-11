import express, { Express, Router } from "express";
import { Response, NextFunction } from "express";
import { expressjwt, Request } from "express-jwt";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import response from "../../external_node/ultils/response";
import common from "./common";
import config from "../../external_node/config";
import user from "./user";
import migration from "./migration";
import upload from "./upload";
import room from "./room";
import location from "./location";
import conversation from "./conversation";
import convenience from "./convenience";

export default (app: Express) => {
  const router = express.Router();

  app.use("/api", router);

  // simple validations jwt
  router.use(
    expressjwt({
      secret: config.get().common.jwtSecretKey || "",
      algorithms: ["HS256"],
    }),
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err.name === "UnauthorizedError") {
        req.auth = undefined;
      }
      next();
    }
  );

  location(router);
  common(router);
  user(router);
  migration(router);
  upload(router);
  room(router);
  conversation(router);
  convenience(router);
};
