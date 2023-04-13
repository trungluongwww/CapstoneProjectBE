import dao from "../../dao";
import errorcode from "../../../internal/errorcode";
import ptoken from "../../../external_node/ultils/ptoken";
import jwt from "jsonwebtoken";
import config from "../../../external_node/config";
import { IUserLoginPayload, IUserLoginResponse } from "../../../internal/interfaces/user";
import { User } from "../../../modules/database/entities";

const login = async (payload: IUserLoginPayload): Promise<[IUserLoginResponse | null, Error | null]> => {
  let [user, err] = await dao.user.find.rawByUsername(payload.username);
  if (!user || err) {
    return [null, Error(errorcode.user.USER_LOGIN_FAILED)];
  }

  if (!(await ptoken.comparePassword(payload.password, user.password))) {
    return [null, Error(errorcode.user.USER_LOGIN_FAILED)];
  }

  let data = {
    id: user.id,
    name: user.name,
    phone: user.phone,
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

export default {
  login,
  rawById,
};
