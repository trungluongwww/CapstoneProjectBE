import { Comment } from "../../../modules/database/entities";
import database from "../../../modules/database";

const one = async (comment: Comment): Promise<Error | null> => {
  const db = database.getDataSource();
  try {
    await db.manager.save(comment);
    return null;
  } catch (e: unknown) {
    console.log(`[Error] dao.comment.create.one ${(e as Error).message}`);
    return e as Error;
  }
};

export default {
  one,
};
