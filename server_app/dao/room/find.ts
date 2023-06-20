import database from "../../../modules/database";
import { Room, User } from "../../../modules/database/entities";
import inconstants from "../../../internal/inconstants";
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

const selectShortSupportRecommend = (): Array<string> => [
  "r.id",
  "r.rentPerMonth",
  "r.squareMetre",
  "r.type",
  "p.id",
  "p.code",
];

const findRecommendIds = async (cond: IRoomQueryCondition): Promise<[Array<Room>, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Room, "r");

    if (cond.wardId) {
      q.orWhere("r.wardId = :wardId", { wardId: cond.wardId });
    }

    if (cond.districtId) {
      q.orWhere("r.districtId = :districtId", { districtId: cond.districtId });
    }

    if (cond.provinceId) {
      q.orWhere("r.provinceId = :provinceId", { provinceId: cond.provinceId });
    }

    if (cond.status) {
      q.andWhere("r.status = :status", { status: cond.status });
    }

    q.select(["r.id", "(select count(*) from user_favourite_rooms ur where ur.room_id = r.id) as total"]);

    q.groupBy("r.id");

    q.orderBy("total", "DESC");

    return [await q.getMany(), null];
  } catch (e) {
    console.log(`[Error] dao.room.find.findRecommendIds ${(e as Error).message}`);
    return [[], e as Error];
  }
};

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

    if (cond.ids?.length) {
      q.andWhere("r.id IN (:...ids)", { ids: cond.ids });
    }

    if (cond.keyword) {
      q.andWhere("r.searchText like :keyword", { keyword: `%${cond.keyword}%` });
    }

    if (cond.status) {
      q.andWhere("r.status = :status", { status: cond.status });
    }

    if (cond.ownerId) {
      q.andWhere("r.userId = :userId", { userId: cond.ownerId });
    }

    if (cond.maxPrice) {
      q.andWhere("r.rentPerMonth <= :maxPrice", { maxPrice: cond.maxPrice });
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
    console.log(`[Error] dao.room.find.all ${(e as Error).message}`);
    return [[], 0, e as Error];
  }
};

const allSupportRecommendation = async (cond: IRoomQueryCondition): Promise<[Room[], Error | null]> => {
  if (!cond.ids) {
    return [[], null];
  }
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

    q.where("r.id IN (:...ids)", { ids: cond.ids });

    q.orderBy("ARRAY_POSITION(:ids2, r.id)", "ASC").setParameter("ids2", cond.ids);

    let docs = await q.getMany();
    return [docs, null];
  } catch (e: unknown) {
    console.log(`[Error] dao.room.find.all ${(e as Error).message}`);
    return [[], e as Error];
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

const countByUserId = async (userId: string): Promise<number> => {
  const db = database.getDataSource();

  try {
    return await db.createQueryBuilder(Room, "r").where("r.userId = :userId", { userId }).getCount();
  } catch (e: unknown) {
    console.log(`[Error] dao.room.find.countByUserId ${(e as Error).message}`);
    return 0;
  }
};

const allShort = async (): Promise<[Room[], Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Room, "r")
      .leftJoinAndMapOne("r.province", "provinces", "p", "r.provinceId = p.id")
      .where("r.status = :status", { status: inconstants.room.status.active })
      .select(selectShortSupportRecommend());

    let docs = await q.getMany();

    return [docs, null];
  } catch (e: unknown) {
    console.log(`[Error] dao.room.find.allShort ${(e as Error).message}`);
    return [[], e as Error];
  }
};

export default {
  all,
  rawById,
  countById,
  detailById,
  findRecommendIds,
  allShort,
  allSupportRecommendation,
  countByUserId,
};
