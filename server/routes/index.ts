import express, { Express, Router } from "express";
import { Response, NextFunction } from "express";
import { expressjwt, Request } from "express-jwt";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import response from "../../node-sub-modules/ultilities/response";

export default (app: Express) => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("tiny"));
  const privateRoute = express.Router();
  const publicRoute = express.Router();

  privateRoute.use(
    expressjwt({ secret: process.env.SECRET_JWT || "", algorithms: ["HS256"] }),
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err.name === "UnauthorizedError") {
        req.auth = undefined;
      }
      next();
    }
  );

  app.use("/api/v1/sv3", publicRoute);
  app.use("/api/v1/sv3", privateRoute);

  app.use("*", (req: Request, res: Response) => {
    return response.r404(res, "The route not found");
  });
};
