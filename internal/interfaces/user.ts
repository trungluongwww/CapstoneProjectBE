import { IDistrictResponse, IProvinceResponse, IWardResponse } from "./location";
import dao from "../../server/dao";

interface IUserCreatePayload {
  username: string;
  password: string;
  phone: string;
  name: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  address: string;
}

interface IUserUpdatePayload {
  name: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  address: string;
  facebook: string;
  zalo: string;
  avatar: string;
  email: string;
}

interface IUserLoginPayload {
  username: string;
  password: string;
}

interface IUserLoginResponse {
  token: string;
}

interface IUserResponse {
  id: string;
  username: string;
  phone: string;
  email: string;
  zalo: string;
  facebook: string;
  name: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  address: string;
  root: boolean;
  province?: IProvinceResponse;
  district?: IDistrictResponse;
  ward?: IWardResponse;
}

interface IUserAddFavouriteRoomPayload {
  roomId: string;
}

export {
  IUserAddFavouriteRoomPayload,
  IUserCreatePayload,
  IUserLoginResponse,
  IUserLoginPayload,
  IUserUpdatePayload,
  IUserResponse,
};
