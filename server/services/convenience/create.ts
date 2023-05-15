import { Convenience } from "../../../modules/database/entities";
import pmongo from "../../../external_node/ultils/pmongo";
import dao from "../../dao";
import { IConvenienceCreatePayload } from "../../../internal/interfaces/convenience";

const createFromClient = async (payload: IConvenienceCreatePayload): Promise<Error | null> => {
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
  createFromClient,
};
