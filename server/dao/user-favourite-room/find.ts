import { UserFavouriteRoom } from "../../../modules/database/entities";
import database from "../../../modules/database";

const byUserAndRoom = async (userId: string, roomId: string): Promise<[UserFavouriteRoom | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(UserFavouriteRoom, "ur")
      .select("ur")
      .where("ur.roomId = :roomId", { roomId })
      .andWhere("ur.userId = :userId", { userId });

    return [await q.getOne(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.user-favourite-room.find.byUserAndRoom ${(e as Error).message}`);
    return [null, e as Error];
  }
};

const byUserId = async (userId: string): Promise<[Array<UserFavouriteRoom>, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(UserFavouriteRoom, "ur").select("ur").andWhere("ur.userId = :userId", { userId });

    return [await q.getMany(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.user-favourite-room.find.byUserAndRoom ${(e as Error).message}`);
    return [[], e as Error];
  }
};

export default {
  byUserAndRoom,
  byUserId,
};
