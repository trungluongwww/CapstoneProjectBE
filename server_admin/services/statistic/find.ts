import dao from "../../dao";
import { IStatisticAllQuery, IStatisticCommonTodayResponse } from "../../../internal/interfaces/statistic";

const all = async (query: IStatisticAllQuery): Promise<IStatisticCommonTodayResponse> => {
  let result = {
    totalConversationCreated: 0,
    totalMessage: 0,
    totalRoomCreated: 0,
    totalRoomFavorites: 0,
    totalRoomUpdated: 0,
  } as IStatisticCommonTodayResponse;

  if (!query.fromDate) {
    return result;
  }

  let start: Date;
  let end: Date | null = null;

  start = new Date(query.fromDate);
  start.setHours(0, 0, 0, 0);

  if (query.toDate) {
    end = new Date(query.toDate);
    end.setHours(23, 59, 59, 999);
  }

  if (!end || end < start) {
    end = new Date();
    end.setHours(23, 59, 59, 999);
  }

  let totalConv = dao.statistic.countConversationCreated(start, end);
  let totalMsg = dao.statistic.countMessageCreated(start, end);
  let totalRoomCreated = dao.statistic.countRoomCreated(start, end);
  let totalRoomUpdated = dao.statistic.countRoomUpdated(start, end);
  let totalFav = dao.statistic.countRoomFavourites(start, end);

  [
    result.totalConversationCreated,
    result.totalMessage,
    result.totalRoomCreated,
    result.totalRoomUpdated,
    result.totalRoomFavorites,
  ] = await Promise.all([totalConv, totalMsg, totalRoomCreated, totalRoomUpdated, totalFav]);

  return result;
};

export default {
  all,
};
