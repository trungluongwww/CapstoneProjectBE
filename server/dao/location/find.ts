import database from "../../../modules/database";
import { District, Province, Ward } from "../../../modules/database/entities";
import errorcode from "../../../internal/errorcode";

const countWardById = async (id: string, districtId: string = ""): Promise<number> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Ward, "w").where("w.id = :id", { id });

    if (districtId) {
      q.andWhere("w.districtId = :districtId", { districtId });
    }

    return await q.getCount();
  } catch (e: unknown) {
    console.log(`[Error] dao.location.find.countWardById ${(e as Error).message}`);
    return 0;
  }
};

const countProvinceById = async (id: string): Promise<number> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Province, "p").where("p.id = :id", { id });

    return await q.getCount();
  } catch (e: unknown) {
    console.log(`[Error] dao.location.find.countProvinceById ${(e as Error).message}`);
    return 0;
  }
};

const countDistrictById = async (id: string, provinceId: string = ""): Promise<number> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(District, "d").where("d.id = :id", { id });

    if (provinceId) {
      q.andWhere("d.provinceId = :provinceId", { provinceId });
    }

    return await q.getCount();
  } catch (e: unknown) {
    console.log(`[Error] dao.location.find.countDistrictById ${(e as Error).message}`);
    return 0;
  }
};

const allProvinces = async (): Promise<[Array<Province> | null, Error | null]> => {
  const db = database.getDataSource();
  try {
    const q = db.createQueryBuilder(Province, "p").select("p");

    return [await q.getMany(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.location.find.allProvinces ${(e as Error).message}`);
    return [[], e as Error];
  }
};

const allDistrictByProvinceId = async (provinceId: string): Promise<[Array<District> | null, Error | null]> => {
  const db = database.getDataSource();
  try {
    const q = db.createQueryBuilder(District, "d").select("d").where("d.provinceId = :provinceId", { provinceId });

    return [await q.getMany(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.location.find.allDistrictByProvinceId ${(e as Error).message}`);
    return [[], e as Error];
  }
};

const allWardByDistrictId = async (districtId: string): Promise<[Array<Ward> | null, Error | null]> => {
  const db = database.getDataSource();
  try {
    const q = db.createQueryBuilder(Ward, "w").select("w").where("w.districtId = :districtId", { districtId });

    return [await q.getMany(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.location.find.allWardByDistrictId ${(e as Error).message}`);
    return [[], e as Error];
  }
};

export default {
  countWardById,
  countProvinceById,
  countDistrictById,
  allProvinces,
  allDistrictByProvinceId,
  allWardByDistrictId,
};
