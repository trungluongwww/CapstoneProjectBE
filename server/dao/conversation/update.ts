import { Conversation } from "../../../modules/database/entities";
import database from "../../../modules/database";

const one = async (conv: Conversation): Promise<Error | null> => {
  const db = database.getDataSource();
  try {
    await db.manager.save(conv);
    return null;
  } catch (e: unknown) {
    console.log(`[Error] dao.conversation.update.one ${(e as Error).message}`);
    return e as Error;
  }
};

export default {
  one,
};
