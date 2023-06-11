import database from "../../../modules/database";
import { Conversation, Message, Room, UserFavouriteRoom } from "../../../modules/database/entities";

const countRoomCreated = async (start: Date, end: Date): Promise<number> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Room, "r")
      .where("r.createdAt > :start", { start })
      .andWhere("r.createdAt < :end", { end });
    q.select("*");

    return await q.getCount();
  } catch (e) {
    console.log(`[Error admin] dao.statistic.index.countRoomCreated ${(e as Error).message}`);
    return 0;
  }
};

const countRoomUpdated = async (start: Date, end: Date): Promise<number> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Room, "r")
      .where("r.updatedAt > :start", { start })
      .andWhere("r.updatedAt < :end", { end });
    q.select("*");

    return await q.getCount();
  } catch (e) {
    console.log(`[Error admin] dao.statistic.index.countRoomUpdated ${(e as Error).message}`);
    return 0;
  }
};

const countRoomFavourites = async (start: Date, end: Date): Promise<number> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(UserFavouriteRoom, "ur")
      .where("ur.createdAt > :start", { start })
      .andWhere("ur.createdAt < :end", { end });
    q.select("*");

    return await q.getCount();
  } catch (e) {
    console.log(`[Error admin] dao.statistic.index.countRoomFavourites ${(e as Error).message}`);
    return 0;
  }
};

const countConversationCreated = async (start: Date, end: Date): Promise<number> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Conversation, "c")
      .where("c.createdAt >= :start", { start })
      .andWhere("c.createdAt <= :end", { end });
    q.select("*");

    return await q.getCount();
  } catch (e) {
    console.log(`[Error admin] dao.statistic.index.countConversationCreated ${(e as Error).message}`);
    return 0;
  }
};

const countMessageCreated = async (start: Date, end: Date): Promise<number> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Message, "m")
      .where("m.createdAt >= :start", { start })
      .andWhere("m.createdAt <= :end", { end });
    q.select("*");

    return await q.getCount();
  } catch (e) {
    console.log(`[Error admin] dao.statistic.index.countMessageCreated ${(e as Error).message}`);
    return 0;
  }
};

export default {
  countRoomCreated,
  countRoomUpdated,
  countRoomFavourites,
  countConversationCreated,
  countMessageCreated,
};
