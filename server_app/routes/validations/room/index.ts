import { body, query } from "express-validator";
import errorCode from "../../../../internal/error-code";
import { checkErrors, paramId } from "../check-errors";
import inconstants from "../../../../internal/inconstants";
import response from "../../../../external_node/ultils/response";

const create = () => {
  // TODO
  /*** this function support create and update */
  return [
    body("name").isString().withMessage(errorCode.room.ROOM_INVALID_NAME),
    body("description")
      .isString()
      .notEmpty()
      .isLength({ max: 999 })
      .withMessage(errorCode.room.ROOM_INVALID_DESCRIPTION),
    body("rentPerMonth").isInt({ min: 0, max: 999999999 }).notEmpty().withMessage(errorCode.room.ROOM_INVALID_PRICE),
    body("deposit").isInt({ min: 0, max: 999999999 }).notEmpty().withMessage(errorCode.room.ROOM_INVALID_DEPOSIT),
    body("squareMetre")
      .isInt({
        min: 0,
        max: 999999999,
      })
      .notEmpty()
      .withMessage(errorCode.room.ROOM_INVALID_SQUARE_METRE),
    body("provinceId").isMongoId().notEmpty().withMessage(errorCode.address.ADDRESS_INVALID_PROVINCE),
    body("districtId").isMongoId().notEmpty().withMessage(errorCode.address.ADDRESS_INVALID_DISTRICT),
    body("wardId").isMongoId().notEmpty().withMessage(errorCode.address.ADDRESS_INVALID_WARD),
    body("type").isIn(inconstants.room.type.all).notEmpty().withMessage(errorCode.room.ROOM_INVALID_TYPE),
    body("address").isString().isLength({ max: 999 }).notEmpty().withMessage(errorCode.room.ROOM_INVALID_ADDRESS),
  ];
};

const all = () => {
  return [
    query("provinceId").isString().withMessage(errorCode.address.ADDRESS_INVALID_PROVINCE).optional({ nullable: true }),
    query("districtId").isString().optional({ nullable: true }).withMessage(errorCode.address.ADDRESS_INVALID_DISTRICT),
    query("wardId").isString().optional({ nullable: true }).withMessage(errorCode.address.ADDRESS_INVALID_WARD),
    query("limit").isInt({ min: 0 }).optional({ nullable: true }).withMessage(response.common.commonInvalidPagination),
    query("keyword").isString().optional({ nullable: true }).withMessage(response.common.commonInvalidKeyword),
    query("orderField")
      .isIn(inconstants.room.sortField.all)
      .optional({ nullable: true })
      .withMessage(response.common.commonInvalidOrderBy),
    query("orderValue")
      .isIn(inconstants.common.sortValue.all)
      .optional({ nullable: true })
      .withMessage(response.common.commonInvalidOrderBy),
    query("type")
      .optional({ nullable: true })
      .isIn(inconstants.room.type.all)
      .withMessage(errorCode.room.ROOM_INVALID_TYPE),
  ];
};

const changeStatus = () => {
  return [
    body("status")
      .isIn(inconstants.room.status.all)
      .optional({ nullable: false })
      .withMessage(errorCode.room.ROOM_INVALID_STATUS),
  ];
};

const addComment = () => {
  return [body("content").isString().optional({ nullable: false }).withMessage(errorCode.comment.COMMENT_INVALID)];
};

const removeFile = () => {
  return [body("fileId").optional({ nullable: false }).isMongoId().withMessage(response.common.commonInvalidID)];
};

export default {
  create: [create(), checkErrors],
  all: [all(), checkErrors],
  update: [create(), paramId(), checkErrors],
  changeStatus: [changeStatus(), paramId(), checkErrors],
  removeFile: [removeFile(), paramId(), checkErrors],
  addFile: [paramId(), checkErrors],
  addComment: [addComment(), paramId(), checkErrors],
  detailById: [paramId(), checkErrors],
};
