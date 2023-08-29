import {
  IConversationAllQuery,
  IConversationAllResponse,
  IConversationDetailQuery,
  IConversationDetailResponse,
  IConversationResponse,
} from "../../../internal/interfaces/conversation";
import { Conversation } from "../../../modules/database/entities";
import services from "../index";
import times from "../../../external_node/ultils/times";
import dao from "../../dao";
import errorCode from "../../../internal/error-code";
import response from "../../../external_node/ultils/response";
import pagnigation from "../../../external_node/ultils/pagigation";
import inconstants from "../../../internal/inconstants";

const detailByQuery = async (
  query: IConversationDetailQuery
): Promise<[IConversationDetailResponse | null, Error | null]> => {
  if (query.userId == query.targetId) {
    return [null, Error(errorCode.conversation.CONVERSATION_INVALID)];
  }
  let [conv] = await dao.conversation.find.byMemberIds(query.userId, query.targetId);
  if (conv) {
    return [{ conversation: convertModelToResponse(conv) } as IConversationDetailResponse, null];
  }

  let [id, err] = await services.conversation.create.fromServer(query.userId, query.targetId);
  if (err) {
    return [null, err];
  }

  const [doc] = await dao.conversation.find.byId(id);
  if (!doc) {
    return [null, Error(errorCode.conversation.CONVERSATION_NOT_FOUND)];
  }

  return [{ conversation: convertModelToResponse(doc) } as IConversationDetailResponse, null];
};

const convertModelToResponse = (conv: Conversation, currentUserId: string = ""): IConversationResponse => {
  return {
    id: conv.id,
    owner: services.user.find.convertModelToResponse(conv.owner),
    participant: services.user.find.convertModelToResponse(conv.participant),
    lastSenderId: conv.lastSenderId,
    unread: currentUserId == conv.lastSenderId ? 0 : conv.unread,
    createdAt: times.newDateTimeUTC7(conv.createdAt),
    updatedAt: times.newDateTimeUTC7(conv.updatedAt),
    lastMessage: services.message.find.convertModelToShortResponse(conv.lastMessage),
  } as IConversationResponse;
};

const detailById = async (id: string, userId: string): Promise<[IConversationDetailResponse | null, Error | null]> => {
  let [conv] = await dao.conversation.find.byId(id);
  if (!conv) {
    return [null, Error(errorCode.conversation.CONVERSATION_NOT_FOUND)];
  }

  if (conv.ownerId != userId && conv.participantId != userId) {
    return [null, Error(response.common.commonNoPermissionKey)];
  }

  return [{ conversation: convertModelToResponse(conv) } as IConversationDetailResponse, null];
};

const rawById = async (id: string): Promise<Conversation | null> => {
  let [conv] = await dao.conversation.find.rawById(id);
  if (!conv) {
    return null;
  }

  return conv;
};

const all = async (query: IConversationAllQuery): Promise<IConversationAllResponse> => {
  let page = 0;

  let enCodePage = pagnigation.getDataFromToken(query.pageToken);
  if (enCodePage.page) {
    page = enCodePage.page;
  }

  let [limit, offset] = pagnigation.getLimitOffset(inconstants.common.pagination.limit.default, page);

  const [docs, total, err] = await dao.conversation.find.manyByUserId(query.userId, limit, offset);

  if (!docs?.length || err) {
    return {
      pageToken: "",
      total: 0,
      conversations: [],
    } as IConversationAllResponse;
  }

  const rs = {
    pageToken: docs?.length == limit ? pagnigation.createPageToken(page + 1, null) : "",
    total: total,
    conversations: [],
  } as IConversationAllResponse;

  for (let doc of docs) {
    rs.conversations.push(convertModelToResponse(doc));
  }

  return rs;
};

export default {
  convertModelToResponse,
  detailByQuery,
  detailById,
  rawById,
  all,
};
