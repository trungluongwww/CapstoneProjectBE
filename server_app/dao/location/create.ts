import database from "../../../modules/database";
import { District, Province, Ward } from "../../../modules/database/entities";

const manyProvinces = async (
  provinces: Array<Province>
): Promise<Error | null> => {
  const db = database.getDataSource();
  try {
    await db.manager.save(provinces);
    return null;
  } catch (e: unknown) {
    console.log(
      `[Error] dao.location.create.manyProvinces ${(e as Error).message}`
    );
    return e as Error;
  }
};

const manyDistricts = async (dts: Array<District>): Promise<Error | null> => {
  const db = database.getDataSource();
  try {
    await db.manager.save(dts);
    return null;
  } catch (e: unknown) {
    console.log(
      `[Error] dao.location.create.manyDistricts ${(e as Error).message}`
    );
    return e as Error;
  }
};

const manyWards = async (ws: Array<Ward>): Promise<Error | null> => {
  const db = database.getDataSource();
  try {
    await db.manager.save(ws);
    return null;
  } catch (e: unknown) {
    console.log(
      `[Error] dao.location.create.manyWards ${(e as Error).message}`
    );
    return e as Error;
  }
};

export default {
  manyProvinces,
  manyDistricts,
  manyWards,
};
