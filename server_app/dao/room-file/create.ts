import { RoomFile } from "../../../modules/database/entities";
import database from "../../../modules/database";

const one = async (file: RoomFile): Promise<Error | null> => {
  const db = database.getDataSource();
  try {
    await db.manager.save(file);
    return null;
  } catch (e: unknown) {
    console.log(`[Error] dao.room-file.create.one ${(e as Error).message}`);
    return e as Error;
  }
};
export default {
  one,
};
