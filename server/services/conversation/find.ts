import {
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

const detailByQuery = async (
  query: IConversationDetailQuery
): Promise<[IConversationDetailResponse | null, Error | null]> => {
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

const convertModelToResponse = (conv: Conversation): IConversationResponse => {
  return {
    id: conv.id,
    owner: services.user.find.convertModelToResponse(conv.owner),
    participant: services.user.find.convertModelToResponse(conv.participant),
    lastSenderId: conv.lastSenderId,
    unread: conv.unread,
    createdAt: times.newDateTimeUTC7(conv.createdAt),
    updatedAt: times.newDateTimeUTC7(conv.updatedAt),
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

export default {
  convertModelToResponse,
  detailByQuery,
  detailById,
};
