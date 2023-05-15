import { Convenience, User, Ward } from "../../../modules/database/entities";
import database from "../../../modules/database";

const all = async (): Promise<[Array<Convenience> | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Convenience, "c").select("c");

    q.orderBy("c.order", "ASC");

    return [await q.getMany(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.convenience.find.all ${(e as Error).message}`);
    return [null, e as Error];
  }
};

const rawById = async (id: string): Promise<[Convenience | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Convenience, "c").where("c.id = :id", { id }).select("c");
    return [await q.getOne(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.convenience.find.rawById ${(e as Error).message}`);
    return [null, e as Error];
  }
};

export default {
  all,
  rawById,
};
