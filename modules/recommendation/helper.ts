import { IRoomRecommendData } from "../../internal/interfaces/recommandation";
import dao from "../../server_app/dao";
import inconstants from "../../internal/inconstants";

const normalize = (target: number, min: number, max: number): number => {
  if (!target) return 0;
  return (target - min) / (max - min);
};
const roomData = async (): Promise<Array<IRoomRecommendData>> => {
  const [rooms] = await dao.room.find.allShort();
  return rooms.map((e) => {
    const typeIndex = normalize(inconstants.room.type.all.indexOf(e.type), 0, inconstants.room.type.all.length);
    const provinceCode = normalize(
      Number(e.province?.code || 0),
      inconstants.province.code.minValue,
      inconstants.province.code.maxValue
    );
    return {
      id: e.id,
      price: normalize(e.rentPerMonth, 0, 100000000),
      type: typeIndex,
      province: provinceCode,
      squareMeter: normalize(e.squareMetre, 0, 1000),
    } as IRoomRecommendData;
  });
};

export default {
  normalize,
  roomData,
};
