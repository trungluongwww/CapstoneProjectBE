import { IResponseCode } from "../../external_node/interfaces/response";

const convenience_invalid_name = "convenience_invalid_name";
const convenience_invalid_code = "convenience_invalid_code";
const convenience_invalid_order = "convenience_invalid_order";
const convenience_invalid = "convenience_invalid";
const convenience_already_exist = "convenience_already_exist";

const list: Array<IResponseCode> = [
  {
    message: "tên của tiện ích không hợp lệ",
    key: convenience_invalid_name,
  },
  {
    message: "mã của tiện ích không hợp lệ",
    key: convenience_invalid_code,
  },
  {
    message: "thứ tự của tiện ích không hợp lệ",
    key: convenience_invalid_order,
  },
  {
    message: "tiện ích không hợp lệ",
    key: convenience_invalid,
  },
  {
    message: "mã của tiện ích đã tồn tại",
    key: convenience_already_exist,
  },
];
export default {
  list,
  convenience_invalid_name,
  convenience_invalid_code,
  convenience_invalid_order,
  convenience_invalid,
  convenience_already_exist,
};
