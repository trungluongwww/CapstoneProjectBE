import { User } from "../../../modules/database/entities";
import database from "../../../modules/database";
import { IUserQueryCondition } from "../../../internal/interfaces/user";

const findRawByEmail = async (cond: IUserQueryCondition): Promise<[User | null, Error | null]> => {
  let db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(User, "u").where("u.email = :email", { email: cond.email });

    q.select(["u"]);

    return [await q.getOne(), null];
  } catch (e: unknown) {
    console.log(`[Error admin] dao.user.find.findRawByEmail ${(e as Error).message}`);
    return [null, e as Error];
  }
};

export default {
  findRawByEmail,
};
