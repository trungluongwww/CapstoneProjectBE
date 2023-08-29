import { body, query } from "express-validator";
import errorCode from "../../../../internal/error-code";
import { checkErrors, paramId } from "../check-errors";
import inConstants from "../../../../internal/inconstants";
import response from "../../../../external_node/ultils/response";

const all = () => {
  return [
    query("provinceId").isString().withMessage(errorCode.address.ADDRESS_INVALID_PROVINCE).optional({ nullable: true }),
    query("districtId").isString().optional({ nullable: true }).withMessage(errorCode.address.ADDRESS_INVALID_DISTRICT),
    query("wardId").isString().optional({ nullable: true }).withMessage(errorCode.address.ADDRESS_INVALID_WARD),
    query("limit").isInt({ min: 0 }).optional({ nullable: true }).withMessage(response.common.commonInvalidPagination),
    query("keyword").isString().optional({ nullable: true }).withMessage(response.common.commonInvalidKeyword),
    query("orderField")
      .isIn(inConstants.room.sortField.all)
      .optional({ nullable: true })
      .withMessage(response.common.commonInvalidOrderBy),
    query("orderValue")
      .isIn(inConstants.common.sortValue.all)
      .optional({ nullable: true })
      .withMessage(response.common.commonInvalidOrderBy),
  ];
};

const changeStatus = () => {
  return [
    body("status")
      .isIn(inConstants.room.status.all)
      .optional({ nullable: false })
      .withMessage(errorCode.room.ROOM_INVALID_STATUS),
  ];
};

export default {
  all: [all(), checkErrors],
  changeStatus: [changeStatus(), paramId(), checkErrors],
  detailById: [paramId(), checkErrors],
};
