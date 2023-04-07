import express, { Express, Router } from "express";
import { Response, NextFunction } from "express";
import { expressjwt, Request } from "express-jwt";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import response from "../../external_node/ultilities/response";
import common from "./common";
import config from "../../external_node/config";
import user from "./user";

export default (app: Express) => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("tiny"));

  // simple validate jwt
  app.use(
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

  const router = express.Router();

  app.use("/api", router);

  common(router);
  user(router);

  app.use("*", (req: Request, res: Response) => {
    return response.r404(res, "The route not found");
  });
};
