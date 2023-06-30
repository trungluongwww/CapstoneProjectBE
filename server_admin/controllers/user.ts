import { Request } from "express-jwt";
import { Response } from "express";
import { IUserAllQuery, IUserLoginPayload } from "../../internal/interfaces/user";
import services from "../services";
import response from "../../external_node/ultils/response";

const findAll = async (req: Request, res: Response) => {
  const query: IUserAllQuery = req.query as never;

  const rs = await services.user.find.all(query);

  return response.r200(res, rs);
};

export default {
  findAll,
};
