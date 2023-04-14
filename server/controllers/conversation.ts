import { Request } from "express-jwt";
import { Response } from "express";
import services from "../services";
import response from "../../external_node/ultils/response";
import { IConversationDetailQuery } from "../../internal/interfaces/conversation";

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

export default {
  findDetail,
  detailByID,
};
