import { Server } from "socket.io";
import socket from "./index";
import connect from "./connect";

export default async (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`[socket] new connection userID: '${socket.data.id}'`);
    connect(socket);
  });
};
