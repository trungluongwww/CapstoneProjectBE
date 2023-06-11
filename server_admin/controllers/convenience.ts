import { Request } from "express-jwt";
import { Response } from "express";
import services from "../services";
import response from "../../external_node/ultils/response";
import { IConvenienceCreatePayload, IConvenienceUpdatePayload } from "../../internal/interfaces/convenience";

const all = async (req: Request, res: Response) => {
  const rs = await services.convenience.find.all();

  return response.r200(res, rs);
};

const create = async (req: Request, res: Response) => {
  let payload = req.body as IConvenienceCreatePayload;
  const err = await services.convenience.create.fromClient(payload);
  if (err) {
    return response.r400(res, null, err.message);
  }

  return response.r200(res);
};

const update = async (req: Request, res: Response) => {
  let id = req.params.id;
  let payload = req.body as IConvenienceUpdatePayload;
  const err = await services.convenience.update.fromClient(id, payload);
  if (err) {
    return response.r400(res, null, err.message);
  }

  return response.r200(res);
};

export default {
  all,
  create,
  update,
};
