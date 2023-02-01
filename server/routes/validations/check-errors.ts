import { NextFunction, Request, Response } from "express";
import { param, body, validationResult } from "express-validator";
import response from "../../../ultilities/response";

const paramId = (name: string = "id") => {
  return param(name).isUUID("all").withMessage("invalid id");
};

const bodyId = (name: string = "id") => {
  return body(name).isUUID("all").withMessage("invalid id");
};

const checkErrors = (req: Request, res: Response, next: NextFunction) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    return response.r400(res, {}, errs.array()[0].msg);
  }
  next();
};

export { paramId, bodyId, checkErrors };
