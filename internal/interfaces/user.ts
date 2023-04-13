import { IDistrictResponse, IProvinceResponse, IWardResponse } from "./location";

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
  createdAt: string;
  updatedAt: string;
  address: string;
  root: boolean;
  province: IProvinceResponse;
  district: IDistrictResponse;
  ward: IWardResponse;
}

export { IUserCreatePayload, IUserLoginResponse, IUserLoginPayload, IUserUpdatePayload };
