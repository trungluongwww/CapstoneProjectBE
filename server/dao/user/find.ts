import { User } from "../../../modules/database/entities";
import database from "../../../modules/database";

const rawById = async (id: string): Promise<[User | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    return [
      await db
        .createQueryBuilder(User, "u")
        .select(["u"])
        .where("u.id := id", { id })
        .getOne(),
      null,
    ];
  } catch (e: unknown) {
    console.log(`[Error] dao.user.find.rawById ${(e as Error).message}`);
    return [null, e as Error];
  }
};

const relsById = async (id: string): Promise<[User | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(User, "u")
      .leftJoinAndMapOne("u.location", "provinces", "p", "p.id = u.provinceId")
      .leftJoinAndMapOne("u.district", "districts", "d", "d.id = u.district_id")
      .leftJoinAndMapOne("u.ward", "wards", "w", "w.id = u.ward_id");

    // assign column
    q.select(["u", "p", "d", "w"]);

    // assign condition
    q.where("u.id := userId", { userId: id });

    return [await q.getOne(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.user.find.relsById ${(e as Error).message}`);
    return [null, e as Error];
  }
};

export default {
  rawById,
  relsById,
};
