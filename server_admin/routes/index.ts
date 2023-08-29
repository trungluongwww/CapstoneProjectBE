import express, { Express, NextFunction, Response } from "express";
import { expressjwt, Request } from "express-jwt";
import config from "../../external_node/config";
import statistic from "./statistic";
import auth from "./auth";
import convenience from "./convenience";
import user from "./user";
import location from "./location";
import room from "./room";

export default (app: Express) => {
  const router = express.Router();

  app.use("/api-admin/", router);

  // simple validations jwt
  router.use(
    expressjwt({
      secret: config.get().common.jwtSecretAdmin || "",
      algorithms: ["HS256"],
    }),
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err.name === "UnauthorizedError") {
        req.auth = undefined;
      }
      next();
    }
  );

  auth(router);
  statistic(router);
  convenience(router);
  user(router);
  room(router);
  location(router);
};
