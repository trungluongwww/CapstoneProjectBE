import database from "../../../modules/database";
import { User } from "../../../modules/database/entities";

const one = async (user: User): Promise<Error | null> => {
  const db = database.getDataSource();
  try {
    await db.manager.save(user);
    return null;
  } catch (e: unknown) {
    console.log(`[Error] dao.user.create.one ${(e as Error).message}`);
    return e as Error;
  }
};

export default {
  one,
};
