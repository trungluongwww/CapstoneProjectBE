import { Convenience } from "../../../modules/database/entities";
import pmongo from "../../../external_node/ultils/pmongo";
import dao from "../../dao";
import { IConvenienceCreatePayload } from "../../../internal/interfaces/convenience";
import errorCode from "../../../internal/error-code";

const fromClient = async (payload: IConvenienceCreatePayload): Promise<Error | null> => {
  if ((await dao.convenience.find.countByCode(payload.code)) > 0) {
    return Error(errorCode.convenience.convenience_already_exist);
  }

  const doc = new Convenience();
  doc.id = pmongo.newStringId();
  doc.code = payload.code;
  doc.name = payload.name;
  doc.order = payload.order;
  doc.createdAt = new Date();
  doc.updatedAt = new Date();

  return await dao.convenience.create.one(doc);
};

export default {
  fromClient,
};
