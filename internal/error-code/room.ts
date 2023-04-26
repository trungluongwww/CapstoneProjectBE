import { IResponseCode } from "../../external_node/interfaces/response";

const ROOM_INVALID_NAME = "ROOM_INVALID_NAME";
const ROOM_INVALID_DESCRIPTION = "ROOM_INVALID_DESCRIPTION";
const ROOM_INVALID_PRICE = "ROOM_INVALID_PRICE";
const ROOM_INVALID_DEPOSIT = "ROOM_INVALID_DEPOSIT";
const ROOM_INVALID_SQUARE_METRE = "ROOM_INVALID_SQUARE_METRE";
const ROOM_INVALID_ADDRESS = "ROOM_INVALID_ADDRESS";
const ROOM_NOT_FOUND = "ROOM_NOT_FOUND";
const ROOM_INVALID_STATUS = "ROOM_INVALID_STATUS";
const ROOM_INVALID_TYPE = "ROOM_INVALID_TYPE";

const list: Array<IResponseCode> = [
  {
    message: "tên phòng không hợp lệ",
    key: ROOM_INVALID_NAME,
  },
  {
    message: "mô tả phòng không hợp lệ",
    key: ROOM_INVALID_DESCRIPTION,
  },
  {
    message: "giá phòng không hợp lệ",
    key: ROOM_INVALID_PRICE,
  },
  {
    message: "tiền cọc không hợp lệ",
    key: ROOM_INVALID_DEPOSIT,
  },
  {
    message: "diện tích phòng không hợp lệ",
    key: ROOM_INVALID_SQUARE_METRE,
  },
  {
    message: "địa chỉ phòng không hợp lệ",
    key: ROOM_INVALID_ADDRESS,
  },
  {
    message: "phòng không tim thấy",
    key: ROOM_NOT_FOUND,
  },
  {
    message: "trạng thái không hợp lệ",
    key: ROOM_INVALID_STATUS,
  },
  {
    message: "loại phòng không hợp lệ",
    key: ROOM_INVALID_TYPE,
  },
];

export default {
  list,
  ROOM_INVALID_NAME,
  ROOM_INVALID_DESCRIPTION,
  ROOM_INVALID_PRICE,
  ROOM_INVALID_DEPOSIT,
  ROOM_INVALID_SQUARE_METRE,
  ROOM_INVALID_ADDRESS,
  ROOM_NOT_FOUND,
  ROOM_INVALID_STATUS,
  ROOM_INVALID_TYPE,
};
