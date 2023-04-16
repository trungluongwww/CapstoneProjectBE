import { IUploadSingleFileRequest, IUploadSingleFileResponse } from "./upload";
import { District, Province, Room, Ward } from "../../modules/database/entities";
import { IDistrictResponse, IProvinceResponse, IWardResponse } from "./location";
import { ICommonKeyValue } from "./common";
import { IUserResponse } from "./user";

interface IRoomCreatePayload {
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
  districtsId: string;
  wardId: string;
  limit: number;
  pageToken: string;
  keyword: string;
  orderField: string;
  orderValue: "ASC" | "DESC";
}

interface IRoomAllResponse {
  rooms: Array<IRoomResponse>;
  total: number;
  pageToken: string;
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
};
