import { Express } from "express";
import * as http from "http";
import { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import response from "../../external_node/ultils/response";
import jwt from "jsonwebtoken";
import config from "../../external_node/config";
import { IJwtUser } from "../../internal/interfaces/common";

let io: Server;

const socketIO = async (e: Express): Promise<HTTPServer> => {
  const httpServer = http.createServer(e);

  io = new Server(httpServer, {
    cors: {
      allowedHeaders: "*",
      origin: "*",
    },
  });

  // validation token
  io.use((socket, next) => {
    const token = socket.handshake.headers.authorization;
    if (!token) {
      socket.disconnect();
      return next(new Error(response.common.commonUnauthorizedKey));
    }

    const splitToken = token?.split(" ");

    if (!splitToken || !splitToken[1] || splitToken[0].toLowerCase() != "bearer") {
      socket.disconnect();
      return next(new Error(response.common.commonUnauthorizedKey));
    }
    try {
      let decoded = jwt.verify(splitToken[1], config.get().common.jwtSecretKey);
      socket.data = decoded as IJwtUser;
      next();
    } catch (e: unknown) {
      console.log("[Error socket] invalid token:", (e as Error).message);
      socket.disconnect();
      next(new Error(response.common.commonUnauthorizedKey));
    }
  });

  return httpServer;
};

export default {
  socketIO,
};
