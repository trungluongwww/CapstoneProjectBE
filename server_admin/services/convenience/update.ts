import dao from "../../dao";
import { IConvenienceUpdatePayload } from "../../../internal/interfaces/convenience";
import errorCode from "../../../internal/error-code";

const fromClient = async (id: string, payload: IConvenienceUpdatePayload): Promise<Error | null> => {
  const [doc, err] = await dao.convenience.find.rawById(id);
  if (err || !doc) {
    return err;
  }

  if (doc.code != payload.code) {
    if ((await dao.convenience.find.countByCode(payload.code)) > 0) {
      return Error(errorCode.convenience.convenience_already_exist);
    }
  }

  doc.name = payload.name;
  doc.code = payload.code;
  doc.order = payload.order;
  doc.updatedAt = new Date();

  return await dao.convenience.update.one(doc);
};

export default {
  fromClient,
};
