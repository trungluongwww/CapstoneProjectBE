import { User } from "../../../modules/database/entities";
import database from "../../../modules/database";

const one = async (user: User): Promise<Error | null> => {
  const db = database.getDataSource();
  try {
    await db.manager.save(user);
    return null;
  } catch (e: unknown) {
    console.log(`[Error] dao.user.update.one ${(e as Error).message}`);
    return e as Error;
  }
};

export default {
  one,
};
