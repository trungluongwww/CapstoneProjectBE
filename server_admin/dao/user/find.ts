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

const profileById = async (id: string): Promise<[User | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(User, "u")
      .leftJoinAndMapOne("u.province", "provinces", "p", "p.id = u.provinceId")
      .leftJoinAndMapOne("u.district", "districts", "d", "d.id = u.districtId")
      .leftJoinAndMapOne("u.ward", "wards", "w", "w.id = u.wardId");

    // assign column
    q.select([
      "u.id",
      "u.createdAt",
      "u.updatedAt",
      "u.phone",
      "u.email",
      "u.name",
      "u.avatar",
      "u.address",
      "u.root",
      "p",
      "d",
      "w",
    ]);

    // assign condition
    q.where("u.id = :userId", { userId: id });

    return [await q.getOne(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.user.find.profileById ${(e as Error).message}`);
    return [null, e as Error];
  }
};

const allByCondition = async (cond: IUserQueryCondition): Promise<[Array<User>, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(User, "u")
      .leftJoinAndMapOne("u.province", "provinces", "p", "p.id = u.provinceId")
      .leftJoinAndMapOne("u.district", "districts", "d", "d.id = u.districtId")
      .leftJoinAndMapOne("u.ward", "wards", "w", "w.id = u.wardId");

    // assign condition
    if (cond.wardId) {
      q.andWhere("u.wardId = :wardId", { wardId: cond.wardId });
    } else if (cond.districtId) {
      q.andWhere("u.districtId = :districtId", { districtId: cond.districtId });
    } else if (cond.provinceId) {
      q.andWhere("u.provinceId = :provinceId", { provinceId: cond.provinceId });
    }

    if (cond.searchText) {
      q.andWhere("u.searchText = :searchText", { searchText: cond.searchText });
    }

    // assign column
    q.select([
      "u.id",
      "u.createdAt",
      "u.updatedAt",
      "u.phone",
      "u.email",
      "u.name",
      "u.avatar",
      "u.address",
      "u.root",
      "p",
      "d",
      "w",
    ]);

    q.skip(cond.offset);
    q.take(cond.limit);

    return [await q.getMany(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.user.find.allByCondition ${(e as Error).message}`);
    return [[], e as Error];
  }
};

const countByCondition = async (cond: IUserQueryCondition): Promise<[number, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(User, "u");

    // assign condition
    if (cond.wardId) {
      q.andWhere("u.wardId = :wardId", { wardId: cond.wardId });
    } else if (cond.districtId) {
      q.andWhere("u.districtId = :districtId", { districtId: cond.districtId });
    } else if (cond.provinceId) {
      q.andWhere("u.provinceId = :provinceId", { provinceId: cond.provinceId });
    }

    if (cond.searchText) {
      q.andWhere("u.searchText = :searchText", { searchText: cond.searchText });
    }

    // assign column
    q.select(["u"]);

    return [await q.getCount(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.user.find.countByCondition ${(e as Error).message}`);
    return [0, e as Error];
  }
};

export default {
  findRawByEmail,
  profileById,
  allByCondition,
  countByCondition,
};
