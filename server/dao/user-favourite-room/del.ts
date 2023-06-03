import { UserFavouriteRoom } from "../../../modules/database/entities";
import database from "../../../modules/database";

const byRaw = async (doc: UserFavouriteRoom): Promise<Error | null> => {
  const db = database.getDataSource();

  try {
    await db.manager.remove(doc);
    return null;
  } catch (e: unknown) {
    console.log(`[Error] dao.user-favourite-room.del.byRaw ${(e as Error).message}`);
    return e as Error;
  }
};

export default {
  byRaw,
};
