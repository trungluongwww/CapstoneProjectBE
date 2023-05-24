import { IDistrictResponse, IProvinceResponse, IWardResponse } from "./location";
import dao from "../../server/dao";

interface IUserCreatePayload {
  email: string;
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
}

interface IUserLoginPayload {
  email: string;
  password: string;
}

interface IUserLoginResponse {
  token: string;
}

interface IUserResponse {
  id: string;
  phone: string;
  email: string;
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

interface IUserChangeAvatarPayload {
  avatar: string;
}

interface IUserChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export {
  IUserAddFavouriteRoomPayload,
  IUserCreatePayload,
  IUserLoginResponse,
  IUserLoginPayload,
  IUserUpdatePayload,
  IUserResponse,
  IUserChangePasswordPayload,
  IUserChangeAvatarPayload,
};
