import { IResponseCode } from "../../external_node/interfaces/response";

const USER_INVALID_USERNAME = "USER_INVALID_USERNAME";
const USER_INVALID_PASSWORD = "USER_INVALID_PASSWORD";
const USER_INVALID_PHONE = "USER_INVALID_PHONE";
const USER_INVALID_NAME = "USER_INVALID_NAME";
const USER_INVALID_ADDRESS = "USER_INVALID_ADDRESS";
const list: Array<IResponseCode> = [
  {
    message: "tài khoản người dùng không hợp lệ",
    key: USER_INVALID_USERNAME,
  },
  {
    message: "mật khẩu không hợp lệ",
    key: USER_INVALID_PASSWORD,
  },
  {
    message: "số điện thoại không hợp lệ",
    key: USER_INVALID_PHONE,
  },
  {
    message: "tên người dùng không hợp lệ",
    key: USER_INVALID_NAME,
  },
  {
    message: "địa chỉ người dùng không hợp lệ",
    key: USER_INVALID_ADDRESS,
  },
];

export default {
  USER_INVALID_USERNAME,
  USER_INVALID_PASSWORD,
  USER_INVALID_PHONE,
  USER_INVALID_NAME,
  USER_INVALID_ADDRESS,
  list,
};
