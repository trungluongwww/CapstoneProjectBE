import { IResponseCode } from "../../external_node/interfaces/response";

const ADDRESS_INVALID_PROVINCE = "ADDRESS_INVALID_PROVINCE";
const ADDRESS_INVALID_DISTRICT = "ADDRESS_INVALID_DISTRICT";
const ADDRESS_INVALID_WARD = "ADDRESS_INVALID_WARD";
const ADDRESS_COMMON_INVALID = "ADDRESS_COMMON_INVALID";

const list: Array<IResponseCode> = [
  {
    message: "thành phố/tỉnh không hợp lệ ",
    key: ADDRESS_INVALID_PROVINCE,
  },
  {
    message: "quận/huyện không hợp lệ ",
    key: ADDRESS_INVALID_DISTRICT,
  },
  {
    message: "phường không hợp lệ ",
    key: ADDRESS_INVALID_WARD,
  },
  {
    message: "địa chỉ không hợp lệ",
    key: ADDRESS_COMMON_INVALID,
  },
];

export default {
  ADDRESS_INVALID_PROVINCE,
  ADDRESS_INVALID_DISTRICT,
  ADDRESS_INVALID_WARD,
  ADDRESS_COMMON_INVALID,
  list,
};
