import { IRoomAddCommentPayload, IRoomAddFilePayload, IRoomCreatePayload } from "../../../internal/interfaces/room";
import { Comment, Convenience, Room, RoomConvenience, RoomFile } from "../../../modules/database/entities";
import strings from "../../../external_node/ultils/strings";
import inConstants from "../../../internal/inconstants";
import location from "../location";
import errorCode from "../../../internal/error-code";
import pmongo from "../../../external_node/ultils/pmongo";
import { IUploadSingleFileResponse } from "../../../internal/interfaces/upload";
import constants from "../../../external_node/constants";
import transaction from "../../transaction";
import services from "../index";
import dao from "../../dao";
import response from "../../../external_node/ultils/response";
import { ICommonUpsertResponse } from "../../../internal/interfaces/common";

const fromClient = async (payload: IRoomCreatePayload): Promise<Error | null> => {
  let user = await services.user.find.rawById(payload.userId);
  if (!user) {
    return Error(errorCode.user.USER_NOT_FOUND);
  }

  if (await dao.room.find.countByUserId(user.id) >= inConstants.room.freeAccountMaxNumOfRoom) {
    return Error(errorCode.room.MAX_ROOM_OF_FREE_ACCOUNT)
  }

  // validations address
  if (!(await location.find.isValidLocation(payload.provinceId, payload.districtId, payload.wardId))) {
    return Error(errorCode.address.ADDRESS_COMMON_INVALID);
  }

  let room = new Room();
  room.id = pmongo.newStringId();
  room.userId = payload.userId;
  room.name = payload.name;
  room.description = payload.description;
  room.rentPerMonth = payload.rentPerMonth;
  room.deposit = payload.deposit;
  room.squareMetre = payload.squareMetre;
  room.provinceId = payload.provinceId;
  room.type = payload.type;
  room.districtId = payload.districtId;
  room.wardId = payload.wardId;
  room.address = payload.address;
  room.searchText = strings.content.convertToLowerUsLang([room.name, room.rentPerMonth, room.address].join(" "));
  room.status = inConstants.room.status.active;
  room.recentActiveAt = new Date();

  let roomFiles: Array<RoomFile> = [];
  for (let file of payload.files) {
    if (!file.name || file.type != constants.upload.type.photo) {
      return Error(errorCode.upload.UPLOAD_INVALID_FILE);
    }
    let roomFile = new RoomFile();
    roomFile.id = pmongo.newStringId();
    roomFile.roomId = room.id;
    roomFile.info = {
      name: file.name,
      originName: file.originName,
      width: file.width,
      height: file.height,
      type: file.type,
      url: file.url,
    } as IUploadSingleFileResponse;
    roomFiles.push(roomFile);
  }

  let conveniences: Array<RoomConvenience> = [];

  // validations conveniences
  if (payload.convenienceIds && payload.convenienceIds.length > 0) {
    const count = await services.convenience.find.countByCondition(payload.convenienceIds);
    if (count != payload.convenienceIds.length) {
      return Error(errorCode.convenience.convenience_invalid);
    }

    payload.convenienceIds.forEach((item) => {
      let doc = new RoomConvenience();
      doc.id = pmongo.newStringId();
      doc.roomId = room.id;
      doc.createdAt = new Date();
      doc.convenienceId = item;
      doc.updatedAt = new Date();
      conveniences.push(doc);
    });
  }

  return await transaction.room.create(room, roomFiles, conveniences);
};

const addFile = async (
  id: string,
  payload: IRoomAddFilePayload
): Promise<[ICommonUpsertResponse | null, Error | null]> => {
  let [room] = await dao.room.find.rawById(id);
  if (!room) {
    return [null, Error(errorCode.room.ROOM_NOT_FOUND)];
  }

  if (room.userId != payload.userId) {
    return [null, Error(response.common.commonNoPermissionKey)];
  }

  if (!payload.file.name) {
    return [null, Error(errorCode.upload.UPLOAD_INVALID_FILE)];
  }

  let doc = new RoomFile();
  doc.id = pmongo.newStringId();
  doc.roomId = room.id;
  doc.createdAt = new Date();
  doc.updatedAt = new Date();
  doc.info = {
    name: payload.file.name,
    originName: payload.file.originName,
    width: payload.file.width,
    height: payload.file.height,
    type: payload.file.type,
    url: payload.file.url,
  } as IUploadSingleFileResponse;

  const err = await dao.roomFile.create.one(doc);
  if (err) {
    return [null, err];
  }

  return [
    {
      id: doc.id,
    } as ICommonUpsertResponse,
    null,
  ];
};

const addComment = async (id: string, payload: IRoomAddCommentPayload): Promise<Error | null> => {
  let [room] = await dao.room.find.rawById(id);
  if (!room) {
    return Error(errorCode.room.ROOM_NOT_FOUND);
  }

  let user = await services.user.find.rawById(payload.userId);
  if (!user) {
    return Error(response.common.commonNoPermissionKey);
  }

  let doc = new Comment();
  doc.id = pmongo.newStringId();
  doc.roomId = id;
  doc.userId = payload.userId;
  doc.content = payload.content;
  doc.createdAt = new Date();
  doc.updatedAt = new Date();

  return await dao.comment.create.one(doc);
};
export default {
  fromClient,
  addFile,
  addComment,
};
