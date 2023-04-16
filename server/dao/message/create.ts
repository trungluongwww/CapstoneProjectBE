import { Message, User } from "../../../modules/database/entities";
import database from "../../../modules/database";

const one = async (msg: Message): Promise<Error | null> => {
  const db = database.getDataSource();
  try {
    await db.manager.save(msg);
    return null;
  } catch (e: unknown) {
    console.log(`[Error] dao.message.create.one ${(e as Error).message}`);
    return e as Error;
  }
};

export default {
  one,
};
