import { IRoomAllResponse } from "../../../internal/interfaces/room";
import { IRoomRecommendData, IRoomSupportRecommend } from "../../../internal/interfaces/recommandation";
import dao from "../../dao";
import inconstants from "../../../internal/inconstants";
import recommendation from "../../../modules/recommendation";

const main = async (roomRecent: Array<IRoomSupportRecommend>): Promise<IRoomAllResponse> => {
  const selectedRooms = roomRecent.map<IRoomRecommendData>((e) => {
    const typeIndex = recommendation.helper.normalize(
      inconstants.room.type.all.indexOf(e.type),
      0,
      inconstants.room.type.all.length
    );
    const provinceCode = recommendation.helper.normalize(
      Number(e.provinceCode || 0),
      inconstants.province.code.minValue,
      inconstants.province.code.maxValue
    );

    return {
      id: e.id,
      price: recommendation.helper.normalize(e.price, 0, 100000000),
      type: typeIndex,
      province: provinceCode,
      squareMeter: recommendation.helper.normalize(e.squareMeter, 0, 1000),
    } as IRoomRecommendData;
  });

  console.log(recommendation.getRecommend(selectedRooms));
  return {} as IRoomAllResponse;
};

export default {
  main,
};
