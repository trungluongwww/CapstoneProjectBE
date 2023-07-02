import { TrackingUserBehavior } from "../../../modules/database/entities";
import pmongo from "../../../external_node/ultils/pmongo";
import dao from "../../dao";
import { IRoomSupportRecommend } from "../../../internal/interfaces/recommandation";

interface ITrackingActionCreatePayload {
  userId: string;
  action: string;
  roomId: string | null;
  conversationId: string;
}

const createAction = async (payload: ITrackingActionCreatePayload) => {
  const doc = new TrackingUserBehavior();
  doc.id = pmongo.newStringId();
  doc.action = payload.action;
  doc.userId = payload.userId;
  doc.roomId = payload.roomId;
  doc.conversationId = payload.conversationId || "";
  doc.createdAt = new Date();
  doc.updatedAt = new Date();

  await dao.trackingUserBehavior.create.one(doc);
};

const findCarefulRoomActionByUser = async (userId: string): Promise<Array<IRoomSupportRecommend>> => {
  const [docs] = await dao.trackingUserBehavior.find.findCarefulRoomActionByUser(userId);

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
  findCarefulRoomActionByUser,
};
