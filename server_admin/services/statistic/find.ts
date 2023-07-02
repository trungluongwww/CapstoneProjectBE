import dao from "../../dao";
import {
  IStatisticAllQuery,
  IStatisticCommonTodayResponse,
  IStatisticRoomResponse,
  IStatisticUserResponse,
} from "../../../internal/interfaces/statistic";
import inconstants from "../../../internal/inconstants";
import { IUserQueryCondition } from "../../../internal/interfaces/user";
import { IRoomQueryCondition } from "../../../internal/interfaces/room";

const all = async (query: IStatisticAllQuery): Promise<IStatisticCommonTodayResponse> => {
  let result = {
    totalConversationCreated: 0,
    totalMessage: 0,
    totalRoomCreated: 0,
    totalRoomFavorites: 0,
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
  let totalFav = dao.statistic.countRoomFavourites(start, end);

  [result.totalConversationCreated, result.totalMessage, result.totalRoomCreated, result.totalRoomFavorites] =
    await Promise.all([totalConv, totalMsg, totalRoomCreated, totalFav]);

  return result;
};

const commonToday = async (): Promise<IStatisticCommonTodayResponse> => {
  let result = {
    totalConversationCreated: 0,
    totalMessage: 0,
    totalRoomCreated: 0,
    totalRoomFavorites: 0,
    totalAccess: 0,
    totalRegister: 0,
  } as IStatisticCommonTodayResponse;

  let start = new Date();
  start.setHours(0, 0, 0, 0);

  let end = new Date();
  end.setHours(23, 59, 59, 999);

  let totalConv = dao.trackingUserBehavior.find.countByCondition({
    action: inconstants.userAction.action.createConversation,
    fromDate: start,
    toDate: end,
  });

  let totalMsg = dao.statistic.countMessageCreated(start, end);

  let totalRoomCreated = dao.trackingUserBehavior.find.countByCondition({
    action: inconstants.userAction.action.createRoom,
    fromDate: start,
    toDate: end,
  });

  let totalRegister = dao.trackingUserBehavior.find.countByCondition({
    action: inconstants.userAction.action.register,
    fromDate: start,
    toDate: end,
  });

  let totalAccess = dao.trackingUserBehavior.find.countByCondition({
    action: inconstants.userAction.action.access,
    fromDate: start,
    toDate: end,
  });

  [
    result.totalRegister,
    result.totalAccess,
    result.totalRoomCreated,
    result.totalConversationCreated,
    result.totalMessage,
  ] = await Promise.all([totalRegister, totalAccess, totalRoomCreated, totalConv, totalMsg]);

  return result;
};

const statisticUser = async (): Promise<IStatisticUserResponse> => {
  let rs = {} as IStatisticUserResponse;

  let start = new Date();
  start.setHours(0, 0, 0, 0);

  let end = new Date();
  end.setHours(23, 59, 59, 999);

  let newRegister = dao.trackingUserBehavior.find.countByCondition({
    action: inconstants.userAction.action.register,
    fromDate: start,
    toDate: end,
  });

  let totalLessor = dao.statistic.countLessor();
  let totalSeeker = dao.statistic.countSeeker();
  let total = dao.user.find.countByCondition({} as IUserQueryCondition);

  [rs.totalRegisterToday, rs.totalLessor, rs.totalSeeker, [rs.total]] = await Promise.all([
    newRegister,
    totalLessor,
    totalSeeker,
    total,
  ]);

  return rs;
};

const statisticRoom = async (): Promise<IStatisticRoomResponse> => {
  const rs = {
    total: 0,
    totalActive: 0,
    totalBanned: 0,
    totalInactive: 0,
    totalPostToday: 0,
  } as IStatisticRoomResponse;

  let start = new Date();
  start.setHours(0, 0, 0, 0);

  let end = new Date();
  end.setHours(23, 59, 59, 999);

  let total = dao.room.find.countByCondition({} as IRoomQueryCondition);
  let totalActive = dao.room.find.countByCondition({ status: inconstants.room.status.active } as IRoomQueryCondition);
  let totalBanned = dao.room.find.countByCondition({ status: inconstants.room.status.banned } as IRoomQueryCondition);
  let totalInactive = dao.room.find.countByCondition({
    status: inconstants.room.status.inactive,
  } as IRoomQueryCondition);
  let totalRoomCreated = dao.trackingUserBehavior.find.countByCondition({
    action: inconstants.userAction.action.createRoom,
    fromDate: start,
    toDate: end,
  });

  [rs.total, rs.totalActive, rs.totalBanned, rs.totalInactive, rs.totalPostToday] = await Promise.all([
    total,
    totalActive,
    totalBanned,
    totalInactive,
    totalRoomCreated,
  ]);

  return rs;
};

export default {
  all,
  commonToday,
  statisticUser,
  statisticRoom,
};
