import { body, query } from "express-validator";
import { checkErrors, paramId } from "../check-errors";
import errorcode from "../../../../internal/errorcode";
import response from "../../../../external_node/ultils/response";

const create = () => {
  return [
    body("username").isString().notEmpty().isLength({ min: 5 }).withMessage(errorcode.user.USER_INVALID_USERNAME),
    body("password").isString().notEmpty().isLength({ min: 6 }).withMessage(errorcode.user.USER_INVALID_PASSWORD),
    body("phone").isString().notEmpty().isLength({ min: 10 }).withMessage(errorcode.user.USER_INVALID_PHONE),
    body("name").isString().notEmpty().isLength({ min: 10 }).withMessage(errorcode.user.USER_INVALID_NAME),
    body("address").notEmpty().withMessage(errorcode.user.USER_INVALID_ADDRESS),
    body("provinceId")
      .isMongoId()
      .notEmpty()

      .withMessage(errorcode.address.ADDRESS_INVALID_PROVINCE),
    body("districtId").isMongoId().notEmpty().withMessage(errorcode.address.ADDRESS_INVALID_DISTRICT),
    body("wardId").isMongoId().notEmpty().withMessage(errorcode.address.ADDRESS_INVALID_WARD),
  ];
};

const update = () => {
  return [
    body("name").isString().notEmpty().isLength({ min: 10 }).withMessage(errorcode.user.USER_INVALID_NAME),
    body("address").notEmpty().withMessage(errorcode.user.USER_INVALID_ADDRESS),
    body("provinceId").isMongoId().notEmpty().withMessage(errorcode.address.ADDRESS_INVALID_PROVINCE),
    body("districtId").isMongoId().notEmpty().withMessage(errorcode.address.ADDRESS_INVALID_DISTRICT),
    body("wardId").isMongoId().notEmpty().withMessage(errorcode.address.ADDRESS_INVALID_WARD),
    body("facebook").isURL().withMessage(errorcode.user.USER_INVALID_FACEBOOK),
    body("zalo").isString().withMessage(errorcode.user.USER_INVALID_ZALO),
  ];
};

const login = () => {
  return [
    body("username").isString().notEmpty().isLength({ min: 5 }).withMessage(errorcode.user.USER_INVALID_USERNAME),
    body("password").notEmpty().withMessage(errorcode.user.USER_INVALID_PASSWORD),
  ];
};

const profile = () => {
  return [query("userId").isMongoId().notEmpty().withMessage(response.common.commonInvalidID)];
};

export default {
  create: [create(), checkErrors],
  update: [update(), checkErrors],
  login: [login(), checkErrors],
  profile: [profile(), checkErrors],
};
