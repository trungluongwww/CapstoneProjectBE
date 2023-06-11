import { Request } from "express-jwt";
import { NextFunction, Response } from "express";
import response from "../../../external_node/ultils/response";

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.auth?.id) {
    return response.r403(res);
  }
  next();
};
