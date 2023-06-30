import { Request } from "express-jwt";
import { Response } from "express";
import services from "../services";
import response from "../../external_node/ultils/response";
import { IRoomAllQuery, IRoomChangeStatusPayload } from "../../internal/interfaces/room";

const all = async (req: Request, res: Response) => {
  const query: IRoomAllQuery = req.query as never;

  const rs = await services.room.find.all(query);

  return response.r200(res, rs);
};

const changeStatus = async (req: Request, res: Response) => {
  const payload = req.body as IRoomChangeStatusPayload;
  payload.userId = req.auth?.id;

  const id = req.params.id;

  const err = await services.room.update.changeStatus(id, payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};

const detailById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const [rs, err] = await services.room.find.detailById(id);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res, rs);
};

export default {
  all,
  changeStatus,
  detailById,
};
