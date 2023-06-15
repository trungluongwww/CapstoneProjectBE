import {
  IRoomAddFilePayload,
  IRoomChangeStatusPayload,
  IRoomDeleteFilePayload,
  IRoomUpdatePayload,
} from "../../../internal/interfaces/room";
import dao from "../../dao";
import errorCode from "../../../internal/error-code";
import response from "../../../external_node/ultils/response";
import services from "../index";
import strings from "../../../external_node/ultils/strings";
import inconstants from "../../../internal/inconstants";
import s3 from "../../../external_node/s3";

const fromClient = async (id: string, payload: IRoomUpdatePayload): Promise<Error | null> => {
  let [room, err] = await dao.room.find.rawById(id);
  if (!room || err) {
    return Error(errorCode.room.ROOM_NOT_FOUND);
  }

  if (room.userId != payload.userId) {
    return Error(response.common.commonNoPermissionKey);
  }

  if (!(await services.location.find.isValidLocation(payload.provinceId, payload.districtId, payload.wardId))) {
    return Error(errorCode.address.ADDRESS_COMMON_INVALID);
  }

  // assign new value
  room.name = payload.name;
  room.type = payload.type;
  room.description = payload.description;
  room.rentPerMonth = payload.rentPerMonth;
  room.deposit = payload.deposit;
  room.squareMetre = payload.squareMetre;
  room.provinceId = payload.provinceId;
  room.districtId = payload.districtId;
  room.wardId = payload.wardId;
  room.address = payload.address;
  room.searchText = strings.content.convertToLowerUsLang([room.name, room.rentPerMonth, room.address].join(" "));
  room.updatedAt = new Date();

  return await dao.room.update.one(room);
};

const changeStatus = async (id: string, payload: IRoomChangeStatusPayload): Promise<Error | null> => {
  let [room, err] = await dao.room.find.rawById(id);
  if (!room || err) {
    return Error(errorCode.room.ROOM_NOT_FOUND);
  }

  if (room.userId != payload.userId) {
    return Error(response.common.commonNoPermissionKey);
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
  fromClient,
  changeStatus,
};
