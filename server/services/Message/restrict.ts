import { Conversation, Message } from "../../../modules/database/entities";
import services from "../index";
import socket from "../../../modules/socket";
import inconstants from "../../../internal/inconstants";

const afterInsert = async (doc: Message, conversation: Conversation) => {
  let err = await services.conversation.update.changeUnread(doc.conversationId, doc.authorId, 1);
  if (err) console.log("[BACKGROUND] service.message.restrict.afterInsert", err?.message);

  emitNewMessage(doc, conversation).then();
};

const emitNewMessage = async (doc: Message, conv: Conversation) => {
  let msg = await services.message.find.detailById(doc.id);
  if (!msg) return;

  // emit new message to socket
  let io = socket.getInstance();

  io.to([conv.participantId, conv.ownerId]).emit(inconstants.socket.event.message.new, msg);
};

export default {
  afterInsert,
};
