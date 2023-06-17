import { IRoomAllResponse, IRoomQueryCondition } from "../../../internal/interfaces/room";
import { IRoomRecommendData, IRoomSupportRecommend } from "../../../internal/interfaces/recommandation";
import dao from "../../dao";
import inconstants from "../../../internal/inconstants";
import recommendation from "../../../modules/recommendation";
import { ISortObject } from "../../../internal/interfaces/common";
import services from "../index";

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

  const ids = recommendation.getRecommend(selectedRooms);

  let [rooms, err] = await dao.room.find.allSupportRecommendation({
    ids: ids,
  } as IRoomQueryCondition);

  if (err) {
    return {
      rooms: [],
      pageToken: "",
      total: 0,
    } as IRoomAllResponse;
  }

  return {
    rooms: rooms.map((r) => services.room.find.convertRoomModelToResponse(r)),
    total: rooms.length,
  } as IRoomAllResponse;
};

export default {
  main,
};
