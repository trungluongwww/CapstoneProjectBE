import { body } from "express-validator";
import errorCode from "../../../../internal/error-code";
import { checkErrors } from "../check-errors";

const login = () => {
  return [
    body("email").isString().notEmpty().isLength({ min: 8 }).withMessage(errorCode.user.USER_INVALID_EMAIL),
    body("password").notEmpty().withMessage(errorCode.user.USER_INVALID_PASSWORD),
  ];
};

export default {
  login: [login(), checkErrors],
};
