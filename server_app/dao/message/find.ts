import database from "../../../modules/database";
import { Message, RoomFile } from "../../../modules/database/entities";

const all = async (
  conversationId: string,
  limit: number,
  createdAt: Date
): Promise<[Array<Message> | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Message, "m")
      .leftJoinAndMapOne("m.room", "rooms", "r", "r.id = m.room_id")
      .select([
        "m",
        "r.id",
        "r.createdAt",
        "r.updatedAt",
        "r.name",
        "r.description",
        "r.rentPerMonth",
        "r.deposit",
        "r.squareMetre",
        "r.status",
        "r.type",
        "r.avatar",
      ]);

    q.where("m.conversationId = :convId", { convId: conversationId }).andWhere("m.createdAt < :createdAt", {
      createdAt,
    });

    // pagination
    q.orderBy("m.createdAt", "DESC");
    q.limit(limit);

    return [await q.getMany(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.message.find.all ${(e as Error).message}`);
    return [null, e as Error];
  }
};

const byId = async (id: string): Promise<[Message | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Message, "m")
      .leftJoinAndMapOne("m.room", "rooms", "r", "r.id = m.room_id")
      .select([
        "m",
        "r.id",
        "r.createdAt",
        "r.updatedAt",
        "r.name",
        "r.description",
        "r.rentPerMonth",
        "r.deposit",
        "r.squareMetre",
        "r.status",
        "r.type",
        "r.avatar",
      ]);

    q.where("m.id = :id", { id });

    return [await q.getOne(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.message.find.byId ${(e as Error).message}`);
    return [null, e as Error];
  }
};

export default {
  all,
  byId,
};
