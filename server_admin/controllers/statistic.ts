import { Request } from "express-jwt";
import { Response } from "express";
import { IUserLoginPayload } from "../../internal/interfaces/user";
import services from "../services";
import response from "../../external_node/ultils/response";
import { IStatisticAllQuery } from "../../internal/interfaces/statistic";

const all = async (req: Request, res: Response) => {
  const payload: IStatisticAllQuery = req.query as never;

  const rs = await services.statistic.find.all(payload);

  return response.r200(res, rs);
};

const commonToday = async (req: Request, res: Response) => {
  const rs = await services.statistic.find.commonToday();

  return response.r200(res, rs);
};

const user = async (req: Request, res: Response) => {
  const rs = await services.statistic.find.statisticUser();

  return response.r200(res, rs);
};

const room = async (req: Request, res: Response) => {
  const rs = await services.statistic.find.statisticRoom();

  return response.r200(res, rs);
};
export default {
  all,
  commonToday,
  user,
  room,
};
