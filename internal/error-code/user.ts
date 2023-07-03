import { IResponseCode } from "../../external_node/interfaces/response";

const USER_INVALID_EMAIL = "USER_INVALID_EMAIL";
const USER_INVALID_PASSWORD = "USER_INVALID_PASSWORD";
const USER_INVALID_PHONE = "USER_INVALID_PHONE";
const USER_INVALID_NAME = "USER_INVALID_NAME";
const USER_INVALID_ADDRESS = "USER_INVALID_ADDRESS";
const USER_ALREADY_EXITS = "USER_ALREADY_EXITS";
const USER_NOT_FOUND = "USER_NOT_FOUND";
const USER_INVALID_FACEBOOK = "USER_INVALID_FACEBOOK";
const USER_INVALID_ZALO = "USER_INVALID_ZALO";
const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";
const USER_INVALID_AVATAR = "USER_INVALID_AVATAR";
const OLD_PASSWORD_INCORRECT = "OLD_PASSWORD_INCORRECT";
const USER_VERIFY_FAILED_EMAIL = "USER_VERIFY_FAILED_EMAIL";

const list: Array<IResponseCode> = [
  {
    message: "thông tin email không hợp lệ",
    key: USER_INVALID_EMAIL,
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
  {
    message: " người dùng đã tồn tại",
    key: USER_ALREADY_EXITS,
  },
  {
    message: " người dùng không tìm thấy",
    key: USER_NOT_FOUND,
  },
  {
    message: "Tài khoản hoặc mật khẩu không đúng",
    key: USER_LOGIN_FAILED,
  },
  {
    message: "Avatar người dùng không hợp lệ",
    key: USER_INVALID_AVATAR,
  },
  {
    message: "Mật khẩu cũ không chính xác",
    key: OLD_PASSWORD_INCORRECT,
  },
  {
    message: "Không thể xác thực email",
    key: USER_VERIFY_FAILED_EMAIL,
  },
];

export default {
  list,
  USER_INVALID_EMAIL,
  USER_INVALID_PASSWORD,
  USER_INVALID_PHONE,
  USER_INVALID_NAME,
  USER_INVALID_ADDRESS,
  USER_ALREADY_EXITS,
  USER_NOT_FOUND,
  USER_INVALID_FACEBOOK,
  USER_INVALID_ZALO,
  USER_LOGIN_FAILED,
  USER_INVALID_AVATAR,
  OLD_PASSWORD_INCORRECT,
  USER_VERIFY_FAILED_EMAIL,
};
