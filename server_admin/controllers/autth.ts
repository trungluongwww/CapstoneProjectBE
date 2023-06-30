import { Request } from "express-jwt";
import { Response } from "express";
import { IUserLoginPayload } from "../../internal/interfaces/user";
import response from "../../external_node/ultils/response";
import services from "../services";

const login = async (req: Request, res: Response) => {
  const payload = req.body as IUserLoginPayload;

  const [rs, err] = await services.user.auth.login(payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res, rs);
};

const me = async (req: Request, res: Response) => {
  const id = req.auth?.id;

  const [rs, err] = await services.user.auth.profile(id);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res, rs);
};

export default {
  login,
  me,
};
