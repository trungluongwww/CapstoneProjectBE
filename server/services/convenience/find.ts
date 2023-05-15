import { Convenience } from "../../../modules/database/entities";
import times from "../../../external_node/ultils/times";
import dao from "../../dao";
import { IConvenienceAllResponse, IConvenienceResponse } from "../../../internal/interfaces/convenience";

const all = async (): Promise<IConvenienceAllResponse> => {
  let [docs, err] = await dao.convenience.find.all();
  if (err || !docs) {
    return {
      conveniences: [],
    } as IConvenienceAllResponse;
  }

  let rs = docs.map((doc) => convertToResponse(doc));

  return {
    conveniences: rs,
  } as IConvenienceAllResponse;
};

const convertToResponse = (doc: Convenience): IConvenienceResponse => {
  return {
    id: doc.id,
    code: doc.code,
    name: doc.name,
    order: doc.order,
    createdAt: times.newDateTimeUTC7(doc.createdAt),
    updatedAt: times.newDateTimeUTC7(doc.updatedAt),
  } as IConvenienceResponse;
};

export default {
  all,
};
