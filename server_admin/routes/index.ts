import express, { Express, NextFunction, Response } from "express";
import { expressjwt, Request } from "express-jwt";
import config from "../../external_node/config";
import statistic from "./statistic";
import user from "./user";
import convenience from "./convenience";

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

  user(router);
  statistic(router);
  convenience(router);
};
