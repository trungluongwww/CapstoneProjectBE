import dao from "../../dao";
import errorCode from "../../../internal/error-code";
import {
  IUserChangeAvatarPayload,
  IUserChangePasswordPayload,
  IUserUpdatePayload,
} from "../../../internal/interfaces/user";
import s3 from "../../../external_node/s3";
import ptoken from "../../../external_node/ultils/ptoken";
import response from "../../../external_node/ultils/response";

const fromClient = async (id: string, payload: IUserUpdatePayload): Promise<Error | null> => {
  const [user, err] = await dao.user.find.rawById(id);
  if (!user || err) {
    return Error(errorCode.user.USER_NOT_FOUND);
  }

  user.name = payload.name;
  user.provinceId = payload.provinceId;
  user.districtId = payload.districtId;
  user.wardId = payload.wardId;
  user.address = payload.address;

  return await dao.user.update.one(user);
};

const changeAvatar = async (id: string, payload: IUserChangeAvatarPayload): Promise<Error | null> => {
  const [user, err] = await dao.user.find.rawById(id);
  if (!user || err) {
    return Error(errorCode.user.USER_NOT_FOUND);
  }

  const oldAvatar = user.avatar;

  user.avatar = payload.avatar;

  const err2 = await dao.user.update.one(user);

  if (!err2 && oldAvatar) {
    s3.removeObjectByKey(oldAvatar).then();
  }

  return err2;
};

const changePassword = async (id: string, payload: IUserChangePasswordPayload): Promise<Error | null> => {
  const [user, err] = await dao.user.find.rawById(id);
  if (!user || err) {
    return Error(errorCode.user.USER_NOT_FOUND);
  }

  if (!(await ptoken.comparePassword(payload.currentPassword, user.password))) {
    return Error(errorCode.user.OLD_PASSWORD_INCORRECT);
  }

  user.password = await ptoken.hashPassword(payload.newPassword);

  return await dao.user.update.one(user);
};
export default {
  fromClient,
  changeAvatar,
  changePassword,
};
