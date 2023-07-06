import { Room, RoomFile } from "../../../modules/database/entities";
import pagination from "../../../external_node/ultils/pagigation";
import dao from "../../dao";
import inConstants from "../../../internal/inconstants";
import {
  IRoomAllQuery,
  IRoomAllQuerySupportAdmin,
  IRoomAllResponse,
  IRoomDetailResponse,
  IRoomFileResponse,
  IRoomQueryCondition,
  IRoomResponse,
  IRoomShortResponse,
} from "../../../internal/interfaces/room";
import { ISortObject } from "../../../internal/interfaces/common";
import services from "../index";
import strings from "../../../external_node/ultils/strings";
import times from "../../../external_node/ultils/times";
import errorCode from "../../../internal/error-code";

const all = async (query: IRoomAllQuerySupportAdmin): Promise<IRoomAllResponse> => {
  if (!query.page) {
    query.page = 0;
  }

  let limit = 20;
  let offset = limit * query.page;

  let order = {} as ISortObject;

  if (!query.orderValue || !query.orderField) {
    order.column = inConstants.room.sortField.createdAt;
    order.value = "DESC";
  } else {
    order.column = query.orderField;
    order.value = query.orderValue;
  }

  query.keyword = strings.content.convertToLowerUsLang(query.keyword);

  let [rooms, total, err] = await dao.room.find.all({
    provinceId: query.provinceId,
    districtId: query.districtId,
    wardId: query.wardId,
    keyword: query.keyword,
    limit: limit,
    offset: offset,
    orders: [order],
    type: query.type,
  } as IRoomQueryCondition);

  if (err) {
    return {
      rooms: [],
      pageToken: "",
      total: 0,
    } as IRoomAllResponse;
  }

  return {
    rooms: rooms.map((r) => convertRoomModelToResponse(r)),
    total: total,
  } as IRoomAllResponse;
};

const detailById = async (id: string): Promise<[IRoomDetailResponse | null, Error | null]> => {
  let [doc, err] = await dao.room.find.detailById(id);

  if (err || !doc) {
    return [null, Error(errorCode.room.ROOM_NOT_FOUND)];
  }

  return [
    {
      room: convertRoomModelToResponse(doc),
    } as IRoomDetailResponse,
    null,
  ];
};

const convertRoomModelToResponse = (room: Room): IRoomResponse => {
  if (!room) {
    return {} as IRoomResponse;
  }
  return {
    id: room.id,
    name: room.name,
    description: room.description,
    rentPerMonth: room.rentPerMonth,
    deposit: room.deposit,
    squareMetre: room.squareMetre,
    province: services.location.find.convertProvinceModelToResponse(room.province),
    district: services.location.find.convertDistrictModelToResponse(room.district),
    ward: services.location.find.convertWardModelToResponse(room.ward),
    address: room.address,
    type: inConstants.room.getObjectType(room.type),
    status: inConstants.room.getObjectStatus(room.status),
    createdAt: times.newDateTimeUTC7(room.createdAt),
    updatedAt: times.newDateTimeUTC7(room.updatedAt),
    files: room.files.map((file) => convertRoomFileModelToResponse(file)),
    owner: services.user.find.convertModelToResponse(room.user),
    conveniences: room.conveniences
      ? room.conveniences.map((conv) => services.convenience.find.convertToResponse(conv.convenience))
      : [],
  } as IRoomResponse;
};

const convertModelToShortResponse = (room: Room): IRoomShortResponse => {
  if (!room) {
    return {} as IRoomShortResponse;
  }

  let rs = {
    id: room.id,
    name: room.name,
    description: room.description,
    rentPerMonth: room.rentPerMonth,
    deposit: room.deposit,
    avatar: "",
    type: inConstants.room.getObjectType(room.type),
    status: inConstants.room.getObjectStatus(room.status),
    createdAt: times.newDateTimeUTC7(room.createdAt),
    updatedAt: times.newDateTimeUTC7(room.updatedAt),
  } as IRoomShortResponse;

  if (room.avatar) {
    rs.avatar = room.avatar.info.url;
  }

  return rs;
};

const convertRoomFileModelToResponse = (file: RoomFile): IRoomFileResponse => {
  if (!file) {
    return {} as IRoomFileResponse;
  }
  return {
    id: file.id,
    info: file.info,
    createdAt: times.newDateTimeUTC7(file.createdAt),
  } as IRoomFileResponse;
};

const rawById = async (id: string): Promise<Room | null> => {
  let [room] = await dao.room.find.rawById(id);

  if (!room) {
    return null;
  }

  return room;
};
export default {
  all,
  convertRoomFileModelToResponse,
  convertModelToShortResponse,
  rawById,
  detailById,
};
