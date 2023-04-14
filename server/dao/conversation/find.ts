import { Conversation } from "../../../modules/database/entities";
import database from "../../../modules/database";

const byId = async (id: string): Promise<[Conversation | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Conversation, "c")
      .leftJoinAndMapOne("c.owner", "users", "u", "u.id = c.ownerId")
      .leftJoinAndMapOne("c.participant", "users", "p", "p.id = c.participantId")
      .select(["c", "p", "u"])
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
      .select(["c", "p", "u"])
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

export default {
  byId,
  byMemberIds,
  countByMemberIds,
};
