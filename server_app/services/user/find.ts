import dao from "../../dao";
import errorCode from "../../../internal/error-code";
import ptoken from "../../../external_node/ultils/ptoken";
import jwt from "jsonwebtoken";
import config from "../../../external_node/config";
import {
  IForgotPasswordPayload,
  IForgotPasswordResponse,
  IResetPasswordPayload,
  IUserLoginPayload,
  IUserLoginResponse,
  IUserResponse,
} from "../../../internal/interfaces/user";
import { User } from "../../../modules/database/entities";
import { IDistrictResponse, IProvinceResponse, IWardResponse } from "../../../internal/interfaces/location";
import services from "../index";
import times from "../../../external_node/ultils/times";
import inconstants from "../../../internal/inconstants";
import sesEmail from "../../../external_node/ses-email";
import strings from "../../../external_node/ultils/strings";
import redis from "../../../external_node/redis";

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

  services.trackingUserBehavior
    .createAction({
      userId: user.id,
      roomId: null,
      action: inconstants.userAction.action.access,
      conversationId: "",
    })
    .then();

  return [convertModelToResponse(user), null];
};

const forgotPassword = async (p: IForgotPasswordPayload): Promise<[IForgotPasswordResponse | null, Error | null]> => {
  let [user, err] = await dao.user.find.rawByUsername(p.email);

  if (err || !user) {
    return [null, Error(errorCode.user.USER_NOT_FOUND)];
  }

  const code = strings.random.makeId(8);

  await redis.set.keyValueWithTTL(`${inconstants.redis.keyPrefix.forgotPassword}_${user.id}`, code, 900);

  await sesEmail.send.email(
    user.email,
    inconstants.common.message.titleBodyEmailForgotPassword,
    `${inconstants.common.message.prefixBodyEmailForgotPassword} ${code}`
  );

  return [{ message: inconstants.common.message.forgotSuccess }, null];
};

const resetPassword = async (p: IResetPasswordPayload): Promise<[IUserLoginResponse | null, Error | null]> => {
  let [user, err] = await dao.user.find.rawByUsername(p.email);

  if (err || !user) {
    return [null, Error(errorCode.user.USER_NOT_FOUND)];
  }

  const code = await redis.get.byKey(`${inconstants.redis.keyPrefix.forgotPassword}_${user.id}`);

  if (code != p.password) {
    return [null, Error(errorCode.user.USER_INVALID_CODE_RESET_PASSWORD)];
  }

  user.password = await ptoken.hashPassword(code);

  err = await dao.user.update.one(user);
  if (err) {
    return [null, Error(errorCode.user.USER_INVALID_CODE_RESET_PASSWORD)];
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

const checkUserIdExist = async (id: string): Promise<boolean> => {
  return (await dao.user.find.countById(id)) > 0;
};

export default {
  login,
  rawById,
  convertModelToResponse,
  profile,
  checkUserIdExist,
  resetPassword,
  forgotPassword,
};
