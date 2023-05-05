import { User, UserFavouriteRoom } from "../../../modules/database/entities";
import pmongo from "../../../external_node/ultils/pmongo";
import ptoken from "../../../external_node/ultils/ptoken";
import dao from "../../dao";
import { IUserAddFavouriteRoomPayload, IUserCreatePayload } from "../../../internal/interfaces/user";
import errorCode from "../../../internal/error-code";
import strings from "../../../external_node/ultils/strings";
import location from "../location";
import services from "../index";

const fromClient = async (payload: IUserCreatePayload): Promise<Error | null> => {
  // validate identity info
  if ((await dao.user.find.countByIdentity(payload.username, payload.phone)) > 0) {
    return Error(errorCode.user.USER_ALREADY_EXITS);
  }

  // validate location info

  if (!(await location.find.isValidLocation(payload.provinceId, payload.districtId, payload.wardId))) {
    return Error(errorCode.address.ADDRESS_COMMON_INVALID);
  }

  // create model
  const hashPw = await ptoken.hashPassword(payload.password);

  const user = new User();
  user.id = pmongo.newStringId();
  user.username = payload.username;
  user.password = hashPw;
  user.phone = payload.phone;
  user.name = payload.name;
  user.provinceId = payload.provinceId;
  user.wardId = payload.wardId;
  user.districtId = payload.districtId;
  user.address = payload.address;
  user.searchText = strings.content.convertToLowerUsLang([user.name, user.username].join(" "));

  return await dao.user.create.one(user);
};

const addFavouriteRoom = async (id: string, payload: IUserAddFavouriteRoomPayload): Promise<Error | null> => {
  let user = await services.user.find.rawById(id);
  if (!user) {
    return Error(errorCode.user.USER_NOT_FOUND);
  }

  let room = await services.room.find.rawById(id);
  if (!room) {
    return Error(errorCode.room.ROOM_NOT_FOUND);
  }

  let [ufr] = await dao.userFavouriteRoom.find.byUserAndRoom(id, payload.roomId);
  if (ufr) {
    return null;
  }

  let newUfr = new UserFavouriteRoom();
  newUfr.id = pmongo.newStringId();
  newUfr.roomId = payload.roomId;
  newUfr.userId = user.id;
  newUfr.createdAt = new Date();
  newUfr.updatedAt = new Date();

  return await dao.userFavouriteRoom.create.one(newUfr);
};

export default {
  fromClient,
  addFavouriteRoom,
};
