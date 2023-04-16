import { Request } from "express-jwt";
import { Response } from "express";
import services from "../services";
import response from "../../external_node/ultils/response";
import {
  IConversationAddMessagePayload,
  IConversationAllMessageQuery, IConversationAllQuery,
  IConversationDetailQuery
} from "../../internal/interfaces/conversation";

const findDetail = async (req: Request, res: Response) => {
  const query: IConversationDetailQuery = req.query as never;
  query.userId = req.auth?.id;

  const [rs, err] = await services.conversation.find.detailByQuery(query);
  if (err) {
    return response.r400(res, null, err.message);
  }

  return response.r200(res, rs);
};

const detailByID = async (req: Request, res: Response) => {
  const id = req.params.id;

  const [rs, err] = await services.conversation.find.detailById(id, req.auth?.id);
  if (err) {
    return response.r400(res, null, err.message);
  }

  return response.r200(res, rs);
};

const newMessage = async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body as IConversationAddMessagePayload;
  payload.authorId = req.auth?.id;

  const err = await services.message.create.createFromClient(id, payload);
  if (err) {
    return response.r400(res, null, err.message);
  }

  return response.r200(res);
};

const allMessage = async (req: Request, res: Response) => {
  const id = req.params.id;
  const query: IConversationAllMessageQuery = req.query as never;
  query.userId = req.auth?.id;

  const [rs, err] = await services.message.find.allByConversationID(id, query);
  if (err) {
    return response.r400(res, null, err.message);
  }

  return response.r200(res, rs);
};

const all = async (req: Request, res: Response) => {
  const query: IConversationAllQuery = req.query as never;
  query.userId = req.auth?.id;

  const rs = await services.conversation.find.all(query);

  return response.r200(res, rs);
};

export default {
  findDetail,
  detailByID,
  newMessage,
  allMessage,
  all,
};
