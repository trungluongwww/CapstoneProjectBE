import { Response } from "express";
import { Request } from "express-jwt";
import {
  IUserAddFavouriteRoomPayload,
  IUserCreatePayload,
  IUserLoginPayload,
  IUserUpdatePayload,
} from "../../internal/interfaces/user";
import services from "../services";
import response from "../../external_node/ultils/response";
import { IRoomAllByUserQuery } from "../../internal/interfaces/room";

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

const me = async (req: Request, res: Response) => {
  const id = req.auth?.id;

  const [rs, err] = await services.user.find.profile(id);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res, rs);
};

const allRoom = async (req: Request, res: Response) => {
  const id = req.auth?.id;
  const query: IRoomAllByUserQuery = req.query as never;

  const [rs, err] = await services.room.find.allByUserId(id, query);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res, rs);
};

const addFavouriteRoom = async (req: Request, res: Response) => {
  const id = req.auth?.id;
  const payload: IUserAddFavouriteRoomPayload = req.body as IUserAddFavouriteRoomPayload;

  const err = await services.user.create.addFavouriteRoom(id, payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};
export default {
  create,
  update,
  login,
  profile,
  me,
  allRoom,
  addFavouriteRoom,
};
