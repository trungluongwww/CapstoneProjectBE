import { Response } from "express";
import { Request } from "express-jwt";
import { IUserCreatePayload } from "../../internal/interfaces/user";
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

export default {
  create,
};
