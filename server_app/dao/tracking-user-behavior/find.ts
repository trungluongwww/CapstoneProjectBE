import { TrackingUserBehavior } from "../../../modules/database/entities";
import database from "../../../modules/database";
import { ISortObject } from "../../../internal/interfaces/common";
import inconstants from "../../../internal/inconstants";

interface ITrackingSearchCondition {
  action: Array<string>;
  limit: number;
  sort: ISortObject;
}

const findCarefulRoomActionByUser = async (userId: string): Promise<[Array<TrackingUserBehavior>, Error | null]> => {
  const db = database.getDataSource();

  try {
    const query = db.createQueryBuilder(TrackingUserBehavior, "t");

    query.leftJoinAndMapOne("t.room", "rooms", "r", "t.roomId = r.id");
    query.leftJoinAndMapOne("r.province", "provinces", "p", "r.provinceId = p.id");

    query.andWhere("t.userId = :userId", { userId });

    query.andWhere("(t.action = :action1 OR t.action = :action2)", {
      action1: inconstants.userAction.action.getDetail,
      action2: inconstants.userAction.action.favourite,
    });

    query.select(["t", "r.id", "r.type", "p", "r.rentPerMonth", "r.squareMetre"]);

    query.orderBy("t.createdAt", "DESC").limit(5);

    return [await query.getMany(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.user-room-history.find.one ${(e as Error).message}`);
    return [[], e as Error];
  }
};

export default {
  findCarefulRoomActionByUser,
};
