import { Response } from "express";
import { Request } from "express-jwt";
import { IUserCreatePayload, IUserLoginPayload, IUserUpdatePayload } from "../../internal/interfaces/user";
import services from "../services";
import response from "../../external_node/ultils/response";

const create = async (req: Request, res: Response) => {
  const payload = req.body as IUserCreatePayload;

  const err = await services.user.create.fromClient(payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};

const update = async (req: Request, res: Response) => {
  const payload = req.body as IUserUpdatePayload;
  const userId = req.auth?.id as string;

  const err = await services.user.update.fromClient(userId, payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};

const login = async (req: Request, res: Response) => {
  const payload = req.body as IUserLoginPayload;

  const [rs, err] = await services.user.find.login(payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res, rs);
};

const profile = async (req: Request, res: Response) => {
  const { userId } = req.query;

  const [rs, err] = await services.user.find.profile(userId as string);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res, rs);
};

export default {
  create,
  update,
  login,
  profile,
};
