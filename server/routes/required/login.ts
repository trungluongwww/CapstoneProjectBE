import { Request } from "express-jwt";
import { NextFunction, Response } from "express";
import response from "../../../ultilities/response";

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.auth?.id) {
    return response.r401(res);
  }
  next();
};
