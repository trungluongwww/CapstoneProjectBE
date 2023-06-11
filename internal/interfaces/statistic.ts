interface IStatisticAllQuery {
  fromDate: Date;
  toDate: Date;
}

interface IStatisticAllResponse {
  totalMessage: number;
  totalRoomCreated: number;
  totalRoomUpdated: number;
  totalConversationCreated: number;
  totalRoomFavorites: number;
}

export { IStatisticAllResponse, IStatisticAllQuery };
