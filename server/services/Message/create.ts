import { IConversationAddMessagePayload } from "../../../internal/interfaces/conversation";
import services from "../index";
import errorCode from "../../../internal/error-code";
import response from "../../../external_node/ultils/response";
import { Message } from "../../../modules/database/entities";
import pmongo from "../../../external_node/ultils/pmongo";
import { IUploadSingleFileResponse } from "../../../internal/interfaces/upload";
import inconstants from "../../../internal/inconstants";
import dao from "../../dao";

const createFromClient = async (
  conversationId: string,
  payload: IConversationAddMessagePayload
): Promise<Error | null> => {
  const conv = await services.conversation.find.rawById(conversationId);
  if (!conv) {
    return Error(errorCode.conversation.CONVERSATION_NOT_FOUND);
  }

  if (conv.ownerId != payload.authorId && conv.participantId != payload.authorId) {
    return Error(response.common.commonNoPermissionKey);
  }

  const msg = new Message();
  msg.id = pmongo.newStringId();
  msg.createdAt = new Date();
  msg.updatedAt = new Date();
  msg.authorId = payload.authorId;
  msg.type = payload.type;
  msg.conversationId = conversationId;

  if (inconstants.message.type.text == msg.type) {
    if (!payload.content) {
      console.log("[Message] message type text but content is empty");
      return Error(errorCode.conversation.CONVERSATION_MESSAGE_TYPE_INVALID);
    }
    msg.content = payload.content;
  }

  if (inconstants.message.type.allFile.includes(payload.type)) {
    if (!payload.file) {
      console.log("[Message] message type file but data is empty");
      return Error(errorCode.conversation.CONVERSATION_MESSAGE_TYPE_INVALID);
    } else {
      msg.file = {
        name: payload.file.name,
        originName: payload.file.originName,
        width: payload.file.width,
        height: payload.file.height,
        type: payload.file.type,
        url: payload.file.url,
      } as IUploadSingleFileResponse;
    }
  }

  if (inconstants.message.type.room == msg.type) {
    if (!(await services.room.find.checkExistById(payload.roomId))) {
      console.log("[Message] message type room but id is empty");
      return Error(errorCode.conversation.CONVERSATION_MESSAGE_TYPE_INVALID);
    }

    msg.roomId = payload.roomId;
  }

  let err = await dao.message.create.one(msg);
  if (!err) {
    // TODO: socket and update unread here
  }

  return err;
};

export default {
  createFromClient,
};
