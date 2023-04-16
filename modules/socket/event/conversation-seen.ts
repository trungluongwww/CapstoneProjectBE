import { Server, Socket } from "socket.io";
import inconstants from "../../../internal/inconstants";
import { ISocketConversationSeenPayload, ISocketEventFailedResponse } from "../../../internal/interfaces/socket";
import pmongo from "../../../external_node/ultils/pmongo";
import services from "../../../server/services";

export default (io: Server, socket: Socket) => {
  socket.on(inconstants.socket.event.conversation.seen, (payload: ISocketConversationSeenPayload) => {
    payload.userId = socket.data.id;

    // validate
    if (!pmongo.isValidMongoId(payload.conversationId)) {
      socket.emit(inconstants.socket.event.error.common, {
        message: "invalid conversation id",
        success: false,
      } as ISocketEventFailedResponse);
    }

    services.conversation.update.seenFromSocket(payload).then((err) => {
      if (err) {
        console.log("[SOCKET] conversation seen: ", err.message);
      }
    });
  });
};
