import { IUploadSingleFileRequest, IUploadSingleFileResponse } from "./upload";
import { District, Province, Room, Ward } from "../../modules/database/entities";
import { IDistrictResponse, IProvinceResponse, IWardResponse } from "./location";
import { ICommonKeyValue } from "./common";
import { IUserResponse } from "./user";
import { IConvenienceResponse } from "./convenience";

interface IRoomCreatePayload {
  type: string;
  userId: string;
  name: string;
  description: string;
  rentPerMonth: number;
  deposit: number;
  squareMetre: number;
  provinceId: string;
  districtId: string;
  wardId: string;
  address: string;
  convenienceIds: Array<string>;
  files: Array<IUploadSingleFileRequest>;
}

interface IRoomUpdatePayload {
  userId: string;
  name: string;
  description: string;
  rentPerMonth: number;
  deposit: number;
  squareMetre: number;
  provinceId: string;
  districtId: string;
  wardId: string;
  address: string;
  type: string;
}

interface IRoomFindAllQuery {
  limit: number;
  pageToken: string;
  provinceId: string;
  wardId: string;
  districtId: string;
  search: string;
}

interface IRoomAllQuery {
  provinceId: string;
  districtId: string;
  wardId: string;
  limit: number;
  pageToken: string;
  keyword: string;
  orderField: string;
  orderValue: "ASC" | "DESC";
  type: string;
}

interface IRoomAllResponse {
  rooms: Array<IRoomResponse>;
  total: number;
  pageToken: string;
}

interface IRoomDetailResponse {
  room: IRoomResponse;
}

interface IRoomResponse {
  id: string;
  name: string;
  owner: IUserResponse;
  description: string;
  rentPerMonth: number;
  deposit: number;
  squareMetre: number;
  province: IProvinceResponse;
  district: IDistrictResponse;
  ward: IWardResponse;
  address: string;
  status: ICommonKeyValue;
  type: ICommonKeyValue;
  createdAt: Date;
  updatedAt: Date;
  files: Array<IRoomFileResponse>;

  conveniences: Array<IConvenienceResponse>;
}

interface IRoomFileResponse {
  id: string;
  info: IUploadSingleFileResponse;
  createdAt: Date;
}

interface IRoomChangeStatusPayload {
  status: string;
  userId: string;
}

interface IRoomDeleteFilePayload {
  fileId: string;
  userId: string;
}

interface IRoomAddFilePayload {
  file: IUploadSingleFileRequest;
  userId: string;
}

interface IRoomAddCommentPayload {
  userId: string;
  content: string;
}

interface IRoomShortResponse {
  id: string;
  name: string;
  description: string;
  rentPerMonth: number;
  deposit: number;
  avatar: string;
  type: ICommonKeyValue;
  status: ICommonKeyValue;
  createdAt: Date;
  updatedAt: Date;
}

interface IRoomAllByUserQuery {
  pageToken: string;
  limit: number;
  status: string;
}

export {
  IRoomCreatePayload,
  IRoomAllQuery,
  IRoomAllResponse,
  IRoomUpdatePayload,
  IRoomChangeStatusPayload,
  IRoomDeleteFilePayload,
  IRoomResponse,
  IRoomFileResponse,
  IRoomAddFilePayload,
  IRoomAddCommentPayload,
  IRoomShortResponse,
  IRoomAllByUserQuery,
  IRoomDetailResponse,
};
