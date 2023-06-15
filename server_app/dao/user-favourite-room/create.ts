import { User, UserFavouriteRoom } from "../../../modules/database/entities";
import database from "../../../modules/database";

const one = async (room: UserFavouriteRoom): Promise<Error | null> => {
  const db = database.getDataSource();
  try {
    await db.manager.save(room);
    return null;
  } catch (e: unknown) {
    console.log(`[Error] dao.user-favourite.create.one ${(e as Error).message}`);
    return e as Error;
  }
};

export default {
  one,
};
