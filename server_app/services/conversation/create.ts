import services from "../index";
import errorCode from "../../../internal/error-code";
import response from "../../../external_node/ultils/response";
import dao from "../../dao";
import { Conversation } from "../../../modules/database/entities";
import pmongo from "../../../external_node/ultils/pmongo";
import inconstants from "../../../internal/inconstants";

const fromServer = async (userId: string, targetId: string): Promise<[string, Error | null]> => {
  if (!(await services.user.find.checkUserIdExist(userId)) || !(await services.user.find.checkUserIdExist(targetId))) {
    return ["", Error(response.common.commonNoPermissionKey)];
  }

  if (await dao.conversation.find.countByMemberIds(userId, targetId)) {
    return ["", Error(errorCode.conversation.CONVERSATION_ALREADY_EXIST)];
  }

  let conv = new Conversation();
  conv.id = pmongo.newStringId();
  conv.createdAt = new Date();
  conv.updatedAt = new Date();
  conv.ownerId = userId;
  conv.participantId = targetId;
  conv.lastSenderId = userId;
  conv.unread = 0;

  let err = await dao.conversation.create.one(conv);
  if (err) {
    return ["", err];
  }

  services.trackingUserBehavior.createAction({
    userId: userId,
    roomId: null,
    action: inconstants.userAction.action.createConversation,
    conversationId: conv.id
  }).then()

  return [conv.id, null];
};

export default {
  fromServer,
};
