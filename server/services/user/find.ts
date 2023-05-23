import dao from "../../dao";
import errorCode from "../../../internal/error-code";
import ptoken from "../../../external_node/ultils/ptoken";
import jwt from "jsonwebtoken";
import config from "../../../external_node/config";
import { IUserLoginPayload, IUserLoginResponse, IUserResponse } from "../../../internal/interfaces/user";
import { User } from "../../../modules/database/entities";
import { IDistrictResponse, IProvinceResponse, IWardResponse } from "../../../internal/interfaces/location";
import services from "../index";
import times from "../../../external_node/ultils/times";

const login = async (payload: IUserLoginPayload): Promise<[IUserLoginResponse | null, Error | null]> => {
  let [user, err] = await dao.user.find.rawByUsername(payload.email);
  if (!user || err) {
    return [null, Error(errorCode.user.USER_LOGIN_FAILED)];
  }

  if (!(await ptoken.comparePassword(payload.password, user.password))) {
    return [null, Error(errorCode.user.USER_LOGIN_FAILED)];
  }

  let data = {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email,
  };

  let token = jwt.sign(data, config.get().common.jwtSecretKey, { expiresIn: "200d" });

  let rs = {
    token: token,
  } as IUserLoginResponse;

  return [rs, null];
};

const rawById = async (id: string): Promise<User | null> => {
  let [user, err] = await dao.user.find.rawById(id);
  if (!user || err) {
    return null;
  }

  return user;
};

const convertModelToResponse = (user: User): IUserResponse => {
  if (!user) {
    return {} as IUserResponse;
  }

  return {
    id: user.id,
    phone: user.phone,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    createdAt: times.newDateTimeUTC7(user.createdAt),
    updatedAt: times.newDateTimeUTC7(user.updatedAt),
    address: user.address,
    root: user.root,
    province: services.location.find.convertProvinceModelToResponse(user.province),
    district: services.location.find.convertDistrictModelToResponse(user.district),
    ward: services.location.find.convertWardModelToResponse(user.ward),
  } as IUserResponse;
};

const profile = async (id: string): Promise<[IUserResponse | null, Error | null]> => {
  let [user, err] = await dao.user.find.relsById(id);

  if (!user || err) {
    return [null, Error(errorCode.user.USER_NOT_FOUND)];
  }

  return [convertModelToResponse(user), null];
};

const checkUserIdExist = async (id: string): Promise<boolean> => {
  return (await dao.user.find.countById(id)) > 0;
};

export default {
  login,
  rawById,
  convertModelToResponse,
  profile,
  checkUserIdExist,
};
