import { IResponseCode } from "../../external_node/interfaces/response";

const UPLOAD_INVALID_FILE = "UPLOAD_INVALID_FILE";
const UPLOAD_INVALID_SIZE = "UPLOAD_INVALID_SIZE";
const UPLOAD_INVALID_EXTENSION = "UPLOAD_INVALID_EXTENSION";

const list: Array<IResponseCode> = [
  {
    message: "file không hợp lệ",
    key: UPLOAD_INVALID_FILE,
  },
  {
    message: "kích thước file không hợp lệ",
    key: UPLOAD_INVALID_SIZE,
  },
  {
    message: "định dạng file không hợp lệ",
    key: UPLOAD_INVALID_EXTENSION,
  },
];

export default {
  list,
  UPLOAD_INVALID_FILE,
  UPLOAD_INVALID_SIZE,
  UPLOAD_INVALID_EXTENSION,
};
