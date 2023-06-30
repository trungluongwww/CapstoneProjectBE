interface IStatisticAllQuery {
  fromDate: Date;
  toDate: Date;
}

interface IStatisticCommonTodayResponse {
  totalRegister: number;
  totalAccess: number;
  totalMessage: number;
  totalRoomCreated: number;
  totalRoomUpdated: number;
  totalConversationCreated: number;
  totalRoomFavorites: number;
}

interface IStatisticRoomResponse {
  total: number;
  totalActive: number;
  totalInactive: number;
  totalBanned: number;
  totalPostToday: number;
}

interface IStatisticUserResponse {
  total: number;
  totalSeeker: number;
  totalLessor: number;
  totalRegisterToday: number;
}

export { IStatisticCommonTodayResponse, IStatisticRoomResponse, IStatisticUserResponse, IStatisticAllQuery };
