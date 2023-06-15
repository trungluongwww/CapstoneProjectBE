import database from "../../../modules/database";
import { RoomFile } from "../../../modules/database/entities";

const byRaw = async (doc: RoomFile): Promise<Error | null> => {
  const db = database.getDataSource();

  try {
    await db.manager.remove(doc);
    return null;
  } catch (e: unknown) {
    console.log(`[Error] dao.room.del.byId ${(e as Error).message}`);
    return e as Error;
  }
};

export default {
  byRaw,
};
