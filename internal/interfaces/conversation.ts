import { IUserResponse } from "./user";

interface IConversationDetailQuery {
  targetId: string;
  userId: string;
}

interface IConversationDetailResponse {
  conversation: IConversationResponse;
}

interface IConversationResponse {
  id: string;
  owner: IUserResponse;
  participant: IUserResponse;
  lastSenderId: string;
  unread: number;
  createdAt: Date;
  updatedAt: Date;
}

export { IConversationDetailQuery, IConversationResponse, IConversationDetailResponse };
