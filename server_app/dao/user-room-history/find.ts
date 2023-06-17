import { UserRoomHistory } from "../../../modules/database/entities";
import database from "../../../modules/database";

const findRecentByUserID = async (userId: string): Promise<[Array<UserRoomHistory>, Error | null]> => {
  const db = database.getDataSource();

  try {
    const query = db.createQueryBuilder(UserRoomHistory, "uh");

    query.leftJoinAndMapOne("uh.room", "rooms", "r", "uh.roomId = r.id");
    query.leftJoinAndMapOne("r.province", "provinces", "p", "r.provinceId = p.id");

    query.orderBy("uh.createdAt", "DESC").limit(5);

    query.select(["uh", "r.id", "r.type", "p", "r.rentPerMonth", "r.squareMetre"]);

    return [await query.getMany(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.user-room-history.find.one ${(e as Error).message}`);
    return [[], e as Error];
  }
};

export default {
  findRecentByUserID,
};
