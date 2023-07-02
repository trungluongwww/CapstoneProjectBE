import database from "../../../modules/database";
import { TrackingUserBehavior } from "../../../modules/database/entities";
import { ITrackingQueryCondition } from "../../../internal/interfaces/tracking-user-behavior";

const countByCondition = async (cond: ITrackingQueryCondition) => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(TrackingUserBehavior, "t");

    if (cond.action) {
      q.andWhere("t.action = :action", { action: cond.action });
    }

    if (cond.fromDate) {
      q.andWhere("t.createdAt >= :fromDate", { fromDate: cond.fromDate });
    }

    if (cond.toDate) {
      q.andWhere("t.updatedAt <= :toDate", { toDate: cond.toDate });
    }

    return await q.getCount();
  } catch (e) {
    console.log(`[Error admin] dao.tracking-user-behavior.countByCondition ${(e as Error).message}`);
    return 0;
  }
};

export default {
  countByCondition,
};
