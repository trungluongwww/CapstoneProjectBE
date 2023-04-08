import { IResponseCode } from "../../external_node/interfaces/response";

const ADDRESS_INVALID_PROVINCE = "ADDRESS_INVALID_PROVINCE";
const ADDRESS_INVALID_DISTRICT = "ADDRESS_INVALID_DISTRICT";
const ADDRESS_INVALID_WARD = "ADDRESS_INVALID_WARD";

const list: Array<IResponseCode> = [
  {
    message: "thành phố/tỉnh không hợp lệ ",
    key: "ADDRESS_INVALID_PROVINCE",
  },
  {
    message: "quận/huyện không hợp lệ ",
    key: "ADDRESS_INVALID_DISTRICT",
  },
  {
    message: "phường không hợp lệ ",
    key: "ADDRESS_INVALID_WARD",
  },
];

export default {
  ADDRESS_INVALID_PROVINCE,
  ADDRESS_INVALID_DISTRICT,
  ADDRESS_INVALID_WARD,
  list,
};
