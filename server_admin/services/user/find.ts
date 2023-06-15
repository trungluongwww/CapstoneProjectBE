import {
  IUserLoginPayload,
  IUserLoginResponse,
  IUserQueryCondition,
  IUserResponse,
} from "../../../internal/interfaces/user";
import dao from "../../dao";
import errorCode from "../../../internal/error-code";
import pToken from "../../../external_node/ultils/ptoken";
import jwt from "jsonwebtoken";
import config from "../../../external_node/config";
import response from "../../../external_node/ultils/response";
import { User } from "../../../modules/database/entities";
import times from "../../../external_node/ultils/times";
import services from "../../../server_admin/services";

const login = async (payload: IUserLoginPayload): Promise<[IUserLoginResponse | null, Error | null]> => {
  let [user, err] = await dao.user.find.findRawByEmail({ email: payload.email } as IUserQueryCondition);
  console.log(user, err);
  if (!user || err) {
    return [null, Error(errorCode.user.USER_LOGIN_FAILED)];
  }

  if (!user.root) {
    return [null, Error(response.common.commonNoPermissionKey)];
  }
  console.log(user.root);

  if (!(await pToken.comparePassword(payload.password, user.password))) {
    return [null, Error(errorCode.user.USER_LOGIN_FAILED)];
  }
  console.log("pass");

  let token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
    },
    config.get().common.jwtSecretAdmin,
    { expiresIn: "200d" }
  );

  let rs = {
    token: token,
  } as IUserLoginResponse;

  return [rs, null];
};

const profile = async (id: string): Promise<[IUserResponse | null, Error | null]> => {
  let [user, err] = await dao.user.find.profileById(id);

  if (!user || err) {
    return [null, Error(errorCode.user.USER_NOT_FOUND)];
  }

  return [convertModelToResponse(user), null];
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

export default {
  login,
  convertModelToResponse,
  profile,
};
