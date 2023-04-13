import { Request } from "express-jwt";
import { Response } from "express";
import services from "../services";
import response from "../../external_node/ultils/response";
import {
  IRoomAddCommentPayload,
  IRoomAddFilePayload,
  IRoomAllQuery,
  IRoomChangeStatusPayload,
  IRoomCreatePayload,
  IRoomDeleteFilePayload,
  IRoomUpdatePayload,
} from "../../internal/interfaces/room";

const create = async (req: Request, res: Response) => {
  const payload = req.body as IRoomCreatePayload;
  payload.userId = req.auth?.id;

  const err = await services.room.create.fromClient(payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};

const all = async (req: Request, res: Response) => {
  const query: IRoomAllQuery = req.query as never;

  const rs = await services.room.find.all(query);

  return response.r200(res, rs);
};

const update = async (req: Request, res: Response) => {
  const payload = req.body as IRoomUpdatePayload;
  payload.userId = req.auth?.id;

  const id = req.params.id;

  const err = await services.room.update.fromClient(id, payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
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

const removeFile = async (req: Request, res: Response) => {
  const payload = req.body as IRoomDeleteFilePayload;
  payload.userId = req.auth?.id;

  const id = req.params.id;

  const err = await services.room.update.removeFile(id, payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};
const addFile = async (req: Request, res: Response) => {
  const payload = req.body as IRoomAddFilePayload;
  payload.userId = req.auth?.id;

  const id = req.params.id;

  const err = await services.room.create.addFile(id, payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};

const addComment = async (req: Request, res: Response) => {
  const payload = req.body as IRoomAddCommentPayload;
  payload.userId = req.auth?.id;

  const id = req.params.id;

  const err = await services.room.create.addComment(id, payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};

export default {
  create,
  all,
  update,
  changeStatus,
  removeFile,
  addFile,
  addComment,
};
