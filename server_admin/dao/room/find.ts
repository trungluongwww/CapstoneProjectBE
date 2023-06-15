import database from "../../../modules/database";
import { Room, User } from "../../../modules/database/entities";
import inconstants from "../../../internal/inconstants";
import { ISortObject } from "../../../internal/interfaces/common";
import { IRoomQueryCondition } from "../../../internal/interfaces/room";

const selectDetailColumn = (): Array<string> => [
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
];

const all = async (cond: IRoomQueryCondition): Promise<[Room[], number, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Room, "r")
      .leftJoinAndMapOne("r.user", "users", "u", "r.userId = u.id")
      .leftJoinAndMapMany("r.files", "room_files", "rf", "r.id = rf.room_id")
      .leftJoinAndMapOne("r.province", "provinces", "p", "r.provinceId = p.id")
      .leftJoinAndMapOne("r.ward", "wards", "w", "r.wardId = w.id")
      .leftJoinAndMapOne("r.district", "districts", "d", "r.districtId = d.id")
      .select(selectDetailColumn());

    if (cond.keyword) {
      q.andWhere("r.searchText like :keyword", { keyword: `%${cond.keyword}%` });
    }

    if (cond.status) {
      q.andWhere("r.status = :status", { status: cond.status });
    }

    if (cond.wardId) {
      q.andWhere("r.wardId = :wardId", { wardId: cond.wardId });
    } else if (cond.districtId) {
      q.andWhere("r.districtId = :districtId", { districtId: cond.districtId });
    } else if (cond.provinceId) {
      q.andWhere("r.provinceId = :provinceId", { provinceId: cond.provinceId });
    }

    if (cond.type) {
      q.andWhere("r.type = :type", { type: cond.type });
    }

    q.skip(cond.offset);
    q.take(cond.limit);

    for (let order of cond.orders) {
      if (order.column == inconstants.room.sortField.price) {
        q.addOrderBy("r.rentPerMonth", order.value);
      }

      if (order.column == inconstants.room.sortField.createdAt) {
        q.addOrderBy("r.createdAt", order.value);
      }
    }

    let docs = await q.getMany();
    let total = await q.getCount();

    return [docs, total, null];
  } catch (e: unknown) {
    console.log(`[Error admin] dao.room.find.all ${(e as Error).message}`);
    return [[], 0, e as Error];
  }
};

const detailById = async (id: string): Promise<[Room | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Room, "r")
      .leftJoinAndMapOne("r.user", "users", "u", "r.userId = u.id")
      .leftJoinAndMapMany("r.files", "room_files", "rf", "r.id = rf.room_id")
      .leftJoinAndMapOne("r.province", "provinces", "p", "r.provinceId = p.id")
      .leftJoinAndMapOne("r.ward", "wards", "w", "r.wardId = w.id")
      .leftJoinAndMapOne("r.district", "districts", "d", "r.districtId = d.id")
      .leftJoinAndMapMany("r.conveniences", "room_conveniences", "rc", "r.id = rc.room_id")
      .leftJoinAndMapOne("rc.convenience", "conveniences", "c", "rc.convenience_id = c.id")
      .select([...selectDetailColumn(), "rc", "c"]);

    q.where("r.id = :id", { id });

    let rs = await q.getOne();
    return [rs, null];
  } catch (e: unknown) {
    console.log(`[Error] dao.room.find.all ${(e as Error).message}`);
    return [null, e as Error];
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
  detailById,
  rawById,
};
