import { UserRoomHistory } from "../../../modules/database/entities";
import pmongo from "../../../external_node/ultils/pmongo";
import dao from "../../dao";
import { IRoomSupportRecommend } from "../../../internal/interfaces/recommandation";

const createAction = async (userId: string, roomId: string, action: string) => {
  const doc = new UserRoomHistory();
  doc.id = pmongo.newStringId();
  doc.action = action;
  doc.userId = userId;
  doc.roomId = roomId;
  doc.createdAt = new Date();
  doc.updatedAt = new Date();

  await dao.UserRoomHistory.create.one(doc);
};

const findRoomActionRecentByUser = async (userId: string): Promise<Array<IRoomSupportRecommend>> => {
  const [docs] = await dao.UserRoomHistory.find.findRecentByUserID(userId);

  const rs: Array<IRoomSupportRecommend> = [];

  for (let doc of docs) {
    if (doc.room) {
      rs.push({
        id: doc.room.id,
        price: doc.room.rentPerMonth,
        squareMeter: doc.room.squareMetre,
        type: doc.room.type,
        provinceCode: Number(doc.room?.province?.code || 0),
      });
    }
  }

  return rs;
};

export default {
  createAction,
  findRoomActionRecentByUser,
};
