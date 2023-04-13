import { District, Province, Room, RoomFile, Ward } from "../../../modules/database/entities";
import pagnigation from "../../../external_node/ultils/pagnigation";
import dao from "../../dao";
import inconstants from "../../../internal/inconstants";
import {
  IRoomAllQuery,
  IRoomAllResponse,
  IRoomDeleteFilePayload,
  IRoomFileResponse,
  IRoomResponse,
} from "../../../internal/interfaces/room";
import { IDistrictResponse, IProvinceResponse, IWardResponse } from "../../../internal/interfaces/location";
import { ICommonKeyValue } from "../../../internal/interfaces/common";
import { IUploadSingleFileResponse } from "../../../internal/interfaces/upload";
import services from "../index";
import strings from "../../../external_node/ultils/strings";

const all = async (query: IRoomAllQuery): Promise<IRoomAllResponse> => {
  let page = 0;

  let enCodePage = pagnigation.getDataFromToken(query.pageToken);
  if (enCodePage.page) {
    page = enCodePage.page;
  }

  let [limit, offset] = pagnigation.getLimitOffset(query.limit, page);

  let orderField: string;
  let orderValue: "ASC" | "DESC";

  if (!query.orderValue || !query.orderField) {
    orderField = inconstants.room.sortField.createdAt;
    orderValue = "DESC";
  } else {
    orderField = query.orderField;
    orderValue = query.orderValue;
  }

  query.keyword = strings.content.convertToLowerUsLang(query.keyword);

  let [rooms, total, err] = await dao.room.find.all(
    query.provinceId,
    query.districtsId,
    query.wardId,
    query.keyword,
    limit,
    offset,
    orderField,
    orderValue
  );

  if (err) {
    return {
      rooms: [],
      pageToken: "",
      total: 0,
    } as IRoomAllResponse;
  }

  let pageToken = total < limit ? 0 : pagnigation.createPageToken(page + 1, null);

  return {
    rooms: rooms.map((r) => convertRoomModelToResponse(r)),
    total: total,
    pageToken: pageToken,
  } as IRoomAllResponse;
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
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
    files: room.files.map((file) => convertRoomFileModelToResponse(file)),
    owner: services.user.find.convertModelToResponse(room.user),
  } as IRoomResponse;
};

const convertRoomFileModelToResponse = (file: RoomFile): IRoomFileResponse => {
  if (!file) {
    return {} as IRoomFileResponse;
  }
  return {
    id: file.id,
    info: file.info,
    createdAt: file.createdAt,
  } as IRoomFileResponse;
};

const rawById = async (id: string): Promise<Room | null> => {
  let [room, err] = await dao.room.find.rawById(id);

  if (!room) {
    return null;
  }

  return room;
};

export default {
  all,
  convertRoomFileModelToResponse,
  rawById,
};
