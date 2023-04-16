import { Conversation } from "../../../modules/database/entities";
import database from "../../../modules/database";

const byId = async (id: string): Promise<[Conversation | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Conversation, "c")
      .leftJoinAndMapOne("c.owner", "users", "u", "u.id = c.ownerId")
      .leftJoinAndMapOne("c.participant", "users", "p", "p.id = c.participantId")
      .select([
        "c.id",
        "c.ownerId",
        "c.participantId",
        "c.createdAt",
        "c.updatedAt",
        "c.lastSenderId",
        "c.unread",
        "p",
        "u",
      ])
      .where("c.id = :id", { id });

    return [await q.getOne(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.conversation.find.byId ${(e as Error).message}`);
    return [null, e as Error];
  }
};

const byMemberIds = async (userId: string, targetId: string): Promise<[Conversation | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Conversation, "c")
      .leftJoinAndMapOne("c.owner", "users", "u", "u.id = c.ownerId")
      .leftJoinAndMapOne("c.participant", "users", "p", "p.id = c.participantId")
      .select([
        "c.id",
        "c.ownerId",
        "c.participantId",
        "c.createdAt",
        "c.updatedAt",
        "c.lastSenderId",
        "c.unread",
        "p",
        "u",
      ])
      .where("c.ownerId = :ownerId and c.participantId = :participantId", {
        ownerId: userId,
        participantId: targetId,
      })
      .orWhere("c.ownerId = :orOwnerId and c.participantId = :orParticipantId", {
        orOwnerId: targetId,
        orParticipantId: userId,
      });
    return [await q.getOne(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.conversation.find.byId ${(e as Error).message}`);
    return [null, e as Error];
  }
};

const countByMemberIds = async (userId: string, targetId: string): Promise<number> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Conversation, "c")
      .where("c.ownerId = :ownerId and c.participantId = :participantId", {
        ownerId: userId,
        participantId: targetId,
      })
      .orWhere("c.ownerId = :orOwnerId and c.participantId = :orParticipantId", {
        orOwnerId: targetId,
        orParticipantId: userId,
      });
    return await q.getCount();
  } catch (e: unknown) {
    console.log(`[Error] dao.conversation.find.byId ${(e as Error).message}`);
    return 0;
  }
};

const countById = async (id: string): Promise<number> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Conversation, "c").where("c.id = :id", { id });

    return await q.getCount();
  } catch (e: unknown) {
    console.log(`[Error] dao.conversation.find.byId ${(e as Error).message}`);
    return 0;
  }
};

const rawById = async (id: string): Promise<[Conversation | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Conversation, "c").select("c").where("c.id = :id", { id });

    return [await q.getOne(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.conversation.find.byId ${(e as Error).message}`);
    return [null, e as Error];
  }
};

const manyByUserId = async (
  userId: string,
  limit: number,
  offset: number
): Promise<[Array<Conversation> | null, number, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Conversation, "c")
      .leftJoinAndMapOne("c.owner", "users", "u", "u.id = c.ownerId")
      .leftJoinAndMapOne("c.participant", "users", "p", "p.id = c.participantId")
      .select(["c", "u", "p"])
      .where("c.ownerId = :ownerId", { ownerId: userId })
      .orWhere("c.participantId = :participantId", { participantId: userId })
      .orderBy("c.updatedAt", "DESC")
      .limit(limit)
      .offset(offset);

    return [await q.getMany(), await q.getCount(), null];
  } catch (e: unknown) {
    console.log(`[Error] dao.conversation.find.manyByUserId ${(e as Error).message}`);
    return [null, 0, e as Error];
  }
};

export default {
  byId,
  byMemberIds,
  countByMemberIds,
  countById,
  rawById,
  manyByUserId,
};
