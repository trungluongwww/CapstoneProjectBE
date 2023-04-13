import { User } from "../../../modules/database/entities";
import database from "../../../modules/database";

const rawById = async (id: string): Promise<[User | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    return [await db.createQueryBuilder(User, "u").select(["u"]).where("u.id = :id", { id }).getOne(), null];
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
      .leftJoinAndMapOne("u.province", "provinces", "p", "p.id = u.provinceId")
      .leftJoinAndMapOne("u.district", "districts", "d", "d.id = u.districtId")
      .leftJoinAndMapOne("u.ward", "wards", "w", "w.id = u.wardId");

    // assign column
    q.select(["u", "p", "d", "w"]);

    // assign condition
    q.where("u.id = :userId", { userId: id });

    return [await q.getOne(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.user.find.relsById ${(e as Error).message}`);
    return [null, e as Error];
  }
};

const countByIdentity = async (username: string, phone: string): Promise<number> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(User, "u")
      .where("u.username = :username", { username })
      .orWhere("u.phone = :phone", { phone });
    return await q.getCount();
  } catch (e: unknown) {
    console.log(`[Error] dao.user.find.countByIdentity ${(e as Error).message}`);
    return 0;
  }
};

const rawByUsername = async (username: string): Promise<[User | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    return [
      await db.createQueryBuilder(User, "u").select(["u"]).where("u.username = :username", { username }).getOne(),
      null,
    ];
  } catch (e: unknown) {
    console.log(`[Error] dao.user.find.rawById ${(e as Error).message}`);
    return [null, e as Error];
  }
};

export default {
  rawById,
  relsById,
  countByIdentity,
  rawByUsername,
};
