import { NextFunction, Request, Response } from "express";
import { param, body, validationResult } from "express-validator";
import response from "../../../external_node/ultils/response";

const paramId = (name: string = "id") => {
  return param(name).isMongoId().withMessage(response.common.commonInvalidID);
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
