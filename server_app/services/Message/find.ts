import {
  IConversationAllMessageQuery,
  IConversationAllMessageResponse,
} from "../../../internal/interfaces/conversation";
import dao from "../../dao";
import services from "../index";
import errorCode from "../../../internal/error-code";
import response from "../../../external_node/ultils/response";
import pagnigation from "../../../external_node/ultils/pagigation";
import inconstants from "../../../internal/inconstants";
import { IMessageResponse, IMessageShortResponse } from "../../../internal/interfaces/message";
import { Message } from "../../../modules/database/entities";
import times from "../../../external_node/ultils/times";
import s3 from "../../../external_node/s3";

const allByConversationID = async (
  id: string,
  query: IConversationAllMessageQuery
): Promise<[IConversationAllMessageResponse | null, Error | null]> => {
  let conv = await services.conversation.find.rawById(id);
  if (!conv) {
    return [null, Error(errorCode.conversation.CONVERSATION_NOT_FOUND)];
  }

  if (conv.ownerId != query.userId && conv.participantId != query.userId) {
    return [null, Error(response.common.commonNoPermissionKey)];
  }

  let limit = inconstants.common.pagination.limit.default;
  let createdAt = new Date();

  let enCodePage = pagnigation.getDataFromToken(query.pageToken);
  if (enCodePage.time) {
    createdAt = enCodePage.time;
  }

  let [docs, err] = await dao.message.find.all(id, limit, createdAt);
  if (err || !docs?.length) {
    return [
      {
        messages: [],
        pageToken: "",
      } as IConversationAllMessageResponse,
      null,
    ];
  }

  let result = {
    pageToken: "",
    messages: [],
  } as IConversationAllMessageResponse;

  for (let doc of docs) {
    result.messages.push(await convertModelToResponse(doc));
  }

  if (result.messages.length == limit) {
    result.pageToken = pagnigation.createPageToken(null, docs[docs.length - 1].createdAt);
  }

  return [result, null];
};

const detailById = async (id: string): Promise<IMessageResponse | null> => {
  let [msg] = await dao.message.find.byId(id);
  if (!msg) {
    return null;
  }

  return await convertModelToResponse(msg);
};

const convertModelToResponse = async (msg: Message): Promise<IMessageResponse> => {
  let rs = {
    id: msg.id,
    authorId: msg.authorId,
    content: msg.content,
    type: msg.type,
    file: msg.file,
    room: services.room.find.convertModelToShortResponse(msg.room),
    conversationId: msg.conversationId,
    createdAt: times.newDateTimeUTC7(msg.createdAt),
    updatedAt: times.newDateTimeUTC7(msg.updatedAt),
  } as IMessageResponse;

  if (rs.file && !rs.file.url && rs.file.name) {
    rs.file.others.link = (await s3.getPresignedURLByKey(rs.file.name)) || "";
  }

  return rs;
};

const convertModelToShortResponse = (msg: Message): IMessageShortResponse | null => {
  if (!msg) {
    return null;
  }

  let rs = {
    id: msg.id,
    authorId: msg.authorId,
    content: msg.content,
    type: msg.type,
    createdAt: times.newDateTimeUTC7(msg.createdAt),
    updatedAt: times.newDateTimeUTC7(msg.updatedAt),
  } as IMessageShortResponse;

  if (!rs.content) {
    rs.content = inconstants.message.getContentByType(rs.type);
  }

  return rs;
};

export default {
  allByConversationID,
  convertModelToShortResponse,
  detailById,
};
