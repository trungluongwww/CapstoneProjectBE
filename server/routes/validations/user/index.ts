import { body, query } from "express-validator";
import { checkErrors } from "../check-errors";
import errorcode from "../../../../internal/errorcode";

const create = () => {
  return [
    body("username")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage(errorcode.user.USER_INVALID_USERNAME),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage(errorcode.user.USER_INVALID_PASSWORD),
    body("phone")
      .notEmpty()
      .isLength({ min: 10 })
      .withMessage(errorcode.user.USER_INVALID_PHONE),
    body("name")
      .notEmpty()
      .isLength({ min: 10 })
      .withMessage(errorcode.user.USER_INVALID_NAME),
    body("address").notEmpty().withMessage(errorcode.user.USER_INVALID_ADDRESS),
    body("provinceId")
      .isMongoId()
      .notEmpty()

      .withMessage(errorcode.address.ADDRESS_INVALID_PROVINCE),
    body("districtId")
      .isMongoId()
      .notEmpty()
      .withMessage(errorcode.address.ADDRESS_INVALID_DISTRICT),
    body("wardId")
      .isMongoId()
      .notEmpty()
      .withMessage(errorcode.address.ADDRESS_INVALID_WARD),
  ];
};

export default {
  create: [create(), checkErrors],
};
