import { IUploadSingleFileResponse } from "./upload";
import { IRoomFileResponse, IRoomShortResponse } from "./room";
import { ICommonKeyValue } from "./common";

interface IMessageResponse {
  id: string;
  authorId: string;
  content: string;
  type: string;
  file: IUploadSingleFileResponse;
  room: IRoomShortResponse;
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IMessageShortResponse {
  id: string;
  authorId: string;
  content: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export { IMessageResponse, IMessageShortResponse };
