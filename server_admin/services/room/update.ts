import { IRoomChangeStatusPayload } from "../../../internal/interfaces/room";
import dao from "../../dao";
import errorCode from "../../../internal/error-code";
import inconstants from "../../../internal/inconstants";

const changeStatus = async (id: string, payload: IRoomChangeStatusPayload): Promise<Error | null> => {
  let [room, err] = await dao.room.find.rawById(id);
  if (!room || err) {
    return Error(errorCode.room.ROOM_NOT_FOUND);
  }

  if (!inconstants.room.status.all.includes(payload.status)) {
    return Error(errorCode.room.ROOM_INVALID_STATUS);
  }

  room.status = payload.status;
  room.updatedAt = new Date();

  let nextResetDate = new Date(room.recentActiveAt);
  nextResetDate.setDate(room.recentActiveAt.getDate() + 3);

  if (nextResetDate > new Date()) {
    room.recentActiveAt = new Date();
  }

  return await dao.room.update.one(room);
};

export default {
  changeStatus,
};
