import { RoomFile, User } from "../../../modules/database/entities";
import database from "../../../modules/database";
import exp from "constants";

const rawById = async (id: string): Promise<[RoomFile | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    return [await db.createQueryBuilder(RoomFile, "r").select(["r"]).where("r.id = :id", { id }).getOne(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.room_find.find.rawById ${(e as Error).message}`);
    return [null, e as Error];
  }
};

export default {
  rawById,
};
