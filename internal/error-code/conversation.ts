import { IResponseCode } from "../../external_node/interfaces/response";

const CONVERSATION_INVALID = "CONVERSATION_INVALID";
const CONVERSATION_NOT_FOUND = "CONVERSATION_NOT_FOUND";
const CONVERSATION_ALREADY_EXIST = "CONVERSATION_ALREADY_EXIST";

const list: Array<IResponseCode> = [
  {
    message: "không tìm thấy cuộc trò chuyện",
    key: CONVERSATION_NOT_FOUND,
  },
  {
    message: "cuộc trò chuyện không hợp lệ",
    key: CONVERSATION_INVALID,
  },
  {
    message: "cuộc trò chuyện đã tồn tại",
    key: CONVERSATION_ALREADY_EXIST,
  },
];

export default {
  list,
  CONVERSATION_INVALID,
  CONVERSATION_NOT_FOUND,
  CONVERSATION_ALREADY_EXIST,
};
