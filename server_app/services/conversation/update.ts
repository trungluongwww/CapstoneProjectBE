import conversation from "./index";
import dao from "../../dao";
import errorCode from "../../../internal/error-code";
import { ISocketConversationSeenPayload } from "../../../internal/interfaces/socket";

const seenFromSocket = async (payload: ISocketConversationSeenPayload): Promise<Error | null> => {
  let conv = await conversation.find.rawById(payload.conversationId);
  if (!conv) {
    return Error(errorCode.conversation.CONVERSATION_NOT_FOUND);
  }

  if (conv.lastSenderId == payload.userId) {
    return null;
  }

  conv.unread = 0;

  return await dao.conversation.update.one(conv);
};

const changeUnread = async (conversationId: string, userId: string, numOfUnread: number): Promise<Error | null> => {
  numOfUnread = Math.floor(numOfUnread);

  let conv = await conversation.find.rawById(conversationId);
  if (!conv) {
    return Error(errorCode.conversation.CONVERSATION_NOT_FOUND);
  }

  if (conv.lastSenderId == userId) {
    conv.unread = conv.unread + numOfUnread;
  } else {
    conv.lastSenderId = userId;
    conv.unread = numOfUnread;
  }

  conv.updatedAt = new Date();
  return await dao.conversation.update.one(conv);
};

export default {
  seenFromSocket,
  changeUnread,
};
