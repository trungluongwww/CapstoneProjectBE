import { IUserAddFavouriteRoomPayload } from "../../../internal/interfaces/user";
import services from "../index";
import errorCode from "../../../internal/error-code";
import dao from "../../dao";

const removeFavouriteRoom = async (id: string, payload: IUserAddFavouriteRoomPayload): Promise<Error | null> => {
  let user = await services.user.find.rawById(id);
  if (!user) {
    return Error(errorCode.user.USER_NOT_FOUND);
  }

  let room = await services.room.find.rawById(payload.roomId);
  if (!room) {
    return Error(errorCode.room.ROOM_NOT_FOUND);
  }

  let [ufr, err] = await dao.userFavouriteRoom.find.byUserAndRoom(id, payload.roomId);
  if (!ufr || err) {
    return null;
  }

  return await dao.userFavouriteRoom.del.byRaw(ufr);
};

export default {
  removeFavouriteRoom,
};
