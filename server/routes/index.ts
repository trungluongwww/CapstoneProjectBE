import express, {Express, Router} from "express";
import {Response, NextFunction} from "express";
import {expressjwt, Request} from "express-jwt";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import response from "../../external_node/ultilities/response";
import common from "./common";
import config from "../../external_node/config";

export default (app: Express) => {
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(morgan("tiny"));
    const privateRoute = express.Router();
    const publicRoute = express.Router();

    // simple validate jwt
    privateRoute.use(
        expressjwt({
            secret: config.get().common.jwtSecretKey || "",
            algorithms: ["HS256"],
        }),
        (err: Error, req: Request, res: Response, next: NextFunction) => {
            if (err.name === "UnauthorizedError") {
                return response.r401(res);
            }
            next();
        }
    );

    app.use("/common", publicRoute);
    app.use("/api", privateRoute);

    common(publicRoute);

    app.use("*", (req: Request, res: Response) => {
        return response.r404(res, "The route not found");
    });
};
