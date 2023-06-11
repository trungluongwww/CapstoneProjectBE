import dao from "../../dao";
import { IConvenienceUpdatePayload } from "../../../internal/interfaces/convenience";

const fromClient = async (id: string, payload: IConvenienceUpdatePayload): Promise<Error | null> => {
  const [doc, err] = await dao.convenience.find.rawById(id);
  if (err || !doc) {
    return err;
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
