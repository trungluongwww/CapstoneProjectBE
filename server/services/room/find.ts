import { District, Province, Room, RoomFile, Ward } from "../../../modules/database/entities";
import pagnigation from "../../../external_node/ultils/pagnigation";
import dao from "../../dao";
import inconstants from "../../../internal/inconstants";
import {
  IRoomAllByUserQuery,
  IRoomAllQuery,
  IRoomAllResponse,
  IRoomDeleteFilePayload,
  IRoomDetailResponse,
  IRoomFileResponse,
  IRoomQueryCondition,
  IRoomResponse,
  IRoomShortResponse,
} from "../../../internal/interfaces/room";
import { IDistrictResponse, IProvinceResponse, IWardResponse } from "../../../internal/interfaces/location";
import { ICommonKeyValue, ISortObject } from "../../../internal/interfaces/common";
import { IUploadSingleFileResponse } from "../../../internal/interfaces/upload";
import services from "../index";
import strings from "../../../external_node/ultils/strings";
import times from "../../../external_node/ultils/times";
import errorCode from "../../../internal/error-code";

const all = async (query: IRoomAllQuery): Promise<IRoomAllResponse> => {
  let page = 0;

  let enCodePage = pagnigation.getDataFromToken(query.pageToken);
  if (enCodePage.page) {
    page = enCodePage.page;
  }

  let [limit, offset] = pagnigation.getLimitOffset(query.limit, page);

  let order = {} as ISortObject;

  if (!query.orderValue || !query.orderField) {
    order.column = inconstants.room.sortField.createdAt;
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
    status: inconstants.room.status.active,
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
    pageToken: rooms.length == limit ? pagnigation.createPageToken(page + 1, null) : "",
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

const allRecommend = async (userId: string): Promise<IRoomAllResponse> => {
  let user = await services.user.find.rawById(userId);
  if (!user || (!user.provinceId && !user.districtId && !user.wardId)) {
    return {
      rooms: [],
      pageToken: "",
      total: 0,
    } as IRoomAllResponse;
  }
  let [limit, offset] = pagnigation.getLimitOffset(20, 0);

  let sorts = [
    {
      value: inconstants.room.sortField.createdAt,
      column: "DESC",
    },
    {
      value: inconstants.room.sortField.createdAt,
      column: "DESC",
    },
  ] as Array<ISortObject>;

  let [rooms, total, err] = await dao.room.find.all({
    provinceId: user.provinceId,
    districtId: user.districtId,
    wardId: user.wardId,
    limit: limit,
    offset: offset,
    orders: sorts,
    status: inconstants.room.status.active,
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

const allByUserId = async (
  id: string,
  query: IRoomAllByUserQuery
): Promise<[IRoomAllResponse | null, Error | null]> => {
  let user = await services.user.find.rawById(id);
  if (!user) {
    return [null, Error(errorCode.user.USER_NOT_FOUND)];
  }

  let page = 0;

  let enCodePage = pagnigation.getDataFromToken(query.pageToken);
  if (enCodePage.page) {
    page = enCodePage.page;
  }

  let [limit, offset] = pagnigation.getLimitOffset(query.limit, page);

  let sorts = [
    {
      value: "DESC",
      column: inconstants.room.sortField.createdAt,
    },
  ] as Array<ISortObject>;

  let [rooms, total, err] = await dao.room.find.all({
    limit: limit,
    offset: offset,
    orders: sorts,
    status: query.status,
    ownerId: user.id,
  } as IRoomQueryCondition);
  if (err) {
    return [
      {
        rooms: [],
        pageToken: "",
        total: 0,
      } as IRoomAllResponse,
      null,
    ];
  }

  let rs = {
    rooms: rooms.map((r) => convertRoomModelToResponse(r)),
    total: total,
    pageToken: rooms.length == limit ? pagnigation.createPageToken(page + 1, null) : "",
  } as IRoomAllResponse;

  return [rs, null];
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
    type: inconstants.room.getObjectType(room.type),
    status: inconstants.room.getObjectStatus(room.status),
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
    type: inconstants.room.getObjectType(room.type),
    status: inconstants.room.getObjectStatus(room.status),
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

const checkExistById = async (id: string): Promise<boolean> => {
  return (await dao.room.find.countById(id)) > 0;
};

export default {
  all,
  convertRoomFileModelToResponse,
  convertModelToShortResponse,
  rawById,
  checkExistById,
  allRecommend,
  allByUserId,
  detailById,
};
