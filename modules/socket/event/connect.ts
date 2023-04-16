import { Socket } from "socket.io";

export default (socket: Socket) => {
  if (!socket.data.id) {
    socket.disconnect()
  }

  socket.join(socket.data.id)
}