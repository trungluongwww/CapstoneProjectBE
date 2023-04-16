import { Server } from "socket.io";
import socket from "../index";
import connect from "./connect";
import conversationSeen from "./conversation-seen";

export default (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`[socket] new connection userID: '${socket.data.id}'`);
    connect(socket);

    conversationSeen(io, socket);
  });
};
