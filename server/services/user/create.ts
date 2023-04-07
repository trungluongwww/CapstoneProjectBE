import {User} from "../../../modules/database/entities";
import pmongo from "../../../external_node/ultilities/pmongo";
import ptoken from "../../../external_node/ultilities/ptoken";
import dao from "../../dao";
import {IUserCreatePayload} from "../../../internal/interfaces/user";

const fromClient = async (
    payload: IUserCreatePayload
): Promise<Error | null> => {
  const hashPw = await ptoken.hashPassword(payload.password);
  const user = new User();

  user.id = pmongo.newStringId();
  user.username = payload.username;
  user.password = hashPw;
  user.phone = payload.phone;
  user.name = payload.name;
  return await dao.user.create.one(user);
};

export default {
  fromClient,
};
