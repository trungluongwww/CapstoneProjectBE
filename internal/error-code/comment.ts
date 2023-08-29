import { IResponseCode } from "../../external_node/interfaces/response";

const COMMENT_INVALID = "COMMENT_INVALID";
const COMMENT_NOT_FOUND = "COMMENT_NOT_FOUND";

const list: Array<IResponseCode> = [
  {
    message: "bình luận không hợp lệ",
    key: COMMENT_INVALID,
  },
  {
    message: "bình luận không tìm thấy",
    key: COMMENT_NOT_FOUND,
  },
];
export default {
  list,
  COMMENT_INVALID,
  COMMENT_NOT_FOUND,
};
