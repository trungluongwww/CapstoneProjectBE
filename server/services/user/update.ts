import dao from "../../dao";
import errorCode from "../../../internal/error-code";
import { IUserUpdatePayload } from "../../../internal/interfaces/user";

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
  user.facebook = payload.facebook;
  user.zalo = payload.zalo;
  user.avatar = payload.avatar;
  user.email = payload.email;

  return await dao.user.update.one(user);
};

export default {
  fromClient,
};
