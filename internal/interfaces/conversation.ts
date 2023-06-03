import { IUserResponse } from "./user";
import { IUploadSingleFileRequest } from "./upload";
import { IMessageResponse, IMessageShortResponse } from "./message";

interface IConversationDetailQuery {
  targetId: string;
  userId: string;
}

interface IConversationAllMessageQuery {
  pageToken: string;
  userId: string;
}

interface IConversationDetailResponse {
  conversation: IConversationResponse;
}

interface IConversationAllMessageResponse {
  messages: Array<IMessageResponse>;
  pageToken: string;
}

interface IConversationResponse {
  id: string;
  owner: IUserResponse;
  participant: IUserResponse;
  lastSenderId: string;
  unread: number;
  createdAt: Date;
  updatedAt: Date;
  lastMessage: IMessageShortResponse | null;
}

interface IConversationAddMessagePayload {
  authorId: string;
  content: string;
  type: string;
  file: IUploadSingleFileRequest;
  roomId: string;
}

interface IConversationAllQuery {
  pageToken: string;
  userId: string;
}

interface IConversationAllResponse {
  conversations: Array<IConversationResponse>;
  total: number;
  pageToken: string;
}

export {
  IConversationAddMessagePayload,
  IConversationDetailQuery,
  IConversationResponse,
  IConversationDetailResponse,
  IConversationAllMessageQuery,
  IConversationAllMessageResponse,
  IConversationAllQuery,
  IConversationAllResponse,
};
