import { body, query } from "express-validator";
import { checkErrors, paramId } from "../check-errors";
import errorCode from "../../../../internal/error-code";
import response from "../../../../external_node/ultils/response";
import inconstants from "../../../../internal/inconstants";

const create = () => {
  return [
    body("email").isEmail().notEmpty().isLength({ min: 8 }).withMessage(errorCode.user.USER_INVALID_EMAIL),
    body("password").isString().notEmpty().isLength({ min: 6 }).withMessage(errorCode.user.USER_INVALID_PASSWORD),
    body("phone").isString().notEmpty().isLength({ min: 10 }).withMessage(errorCode.user.USER_INVALID_PHONE),
    body("name").isString().notEmpty().isLength({ min: 10 }).withMessage(errorCode.user.USER_INVALID_NAME),
    body("address").notEmpty().withMessage(errorCode.user.USER_INVALID_ADDRESS),
    body("provinceId")
      .isMongoId()
      .notEmpty()

      .withMessage(errorCode.address.ADDRESS_INVALID_PROVINCE),
    body("districtId").isMongoId().notEmpty().withMessage(errorCode.address.ADDRESS_INVALID_DISTRICT),
    body("wardId").isMongoId().notEmpty().withMessage(errorCode.address.ADDRESS_INVALID_WARD),
  ];
};

const update = () => {
  return [
    body("name").isString().notEmpty().isLength({ min: 10 }).withMessage(errorCode.user.USER_INVALID_NAME),
    body("address").notEmpty().withMessage(errorCode.user.USER_INVALID_ADDRESS),
    body("provinceId").isMongoId().notEmpty().withMessage(errorCode.address.ADDRESS_INVALID_PROVINCE),
    body("districtId").isMongoId().notEmpty().withMessage(errorCode.address.ADDRESS_INVALID_DISTRICT),
    body("wardId").isMongoId().notEmpty().withMessage(errorCode.address.ADDRESS_INVALID_WARD),
  ];
};

const login = () => {
  return [
    body("email").isString().notEmpty().isLength({ min: 8 }).withMessage(errorCode.user.USER_INVALID_EMAIL),
    body("password").notEmpty().withMessage(errorCode.user.USER_INVALID_PASSWORD),
  ];
};

const profile = () => {
  return [query("userId").isMongoId().notEmpty().withMessage(response.common.commonInvalidID)];
};

const allRoom = () => {
  return [
    query("limit").isInt().notEmpty().withMessage(response.common.commonInvalidPagination),
    query("status")
      .optional({ nullable: false })
      .isIn(inconstants.room.status.all)
      .withMessage(errorCode.room.ROOM_INVALID_STATUS),
  ];
};

export default {
  create: [create(), checkErrors],
  update: [update(), checkErrors],
  login: [login(), checkErrors],
  profile: [profile(), checkErrors],
  allRoom: [allRoom(), checkErrors],
};
