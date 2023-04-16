import database from "../../../modules/database";
import { Room, User } from "../../../modules/database/entities";
import inconstants from "../../../internal/inconstants";

const all = async (
  provinceId: string,
  districtId: string,
  wardId: string,
  keyword: string,
  limit: number,
  offset: number,
  orderField: string,
  orderValue: "ASC" | "DESC"
): Promise<[Room[], number, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Room, "r")
      .leftJoinAndMapOne("r.user", "users", "u", "r.userId = u.id")
      .leftJoinAndMapMany("r.files", "room_files", "rf", "r.id = rf.room_id")
      .leftJoinAndMapOne("r.province", "provinces", "p", "r.provinceId = p.id")
      .leftJoinAndMapOne("r.ward", "wards", "w", "r.wardId = w.id")
      .leftJoinAndMapOne("r.district", "districts", "d", "r.districtId = d.id")
      .select([
        "r.id",
        "r.name",
        "r.description",
        "r.rentPerMonth",
        "r.deposit",
        "r.squareMetre",
        "r.address",
        "r.status",
        "r.type",
        "r.createdAt",
        "r.updatedAt",
        "rf.id",
        "rf.info",
        "rf.createdAt",
        "p",
        "w",
        "d",
        "u.id",
        "u.name",
        "u.avatar",
      ]);

    if (wardId) {
      q.where("r.wardId = :wardId", { wardId });
    } else if (districtId) {
      q.where("r.districtId = :districtId", { districtId });
    } else if (provinceId) {
      q.where("r.provinceId = :provinceId", { provinceId });
    }

    if (keyword) {
      q.andWhere("r.searchText like :keyword", { keyword: `%${keyword}%` });
    }

    q.limit(limit);
    q.skip(offset);

    if (orderField == inconstants.room.sortField.price) {
      q.addOrderBy("r.rentPerMonth", orderValue);
    }

    if (orderField == inconstants.room.sortField.createdAt) {
      q.addOrderBy("r.createdAt", orderValue);
    }

    let docs = await q.getMany();
    let total = await q.getCount();

    return [docs, total, null];
  } catch (e: unknown) {
    console.log(`[Error] dao.room.find.all ${(e as Error).message}`);
    return [[], 0, e as Error];
  }
};

const rawById = async (id: string): Promise<[Room | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    return [await db.createQueryBuilder(Room, "r").select(["r"]).where("r.id = :id", { id }).getOne(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.room.find.rawById ${(e as Error).message}`);
    return [null, e as Error];
  }
};

const countById = async (id: string): Promise<number> => {
  const db = database.getDataSource();

  try {
    return await db.createQueryBuilder(Room, "r").where("r.id = :id", { id }).getCount();
  } catch (e: unknown) {
    console.log(`[Error] dao.room.find.countById ${(e as Error).message}`);
    return 0;
  }
};

export default {
  all,
  rawById,
  countById,
};
