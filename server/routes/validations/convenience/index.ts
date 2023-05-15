import { body } from "express-validator";
import errorCode from "../../../../internal/error-code";
import inconstants from "../../../../internal/inconstants";
import { checkErrors, paramId } from "../check-errors";

const create = () => {
  /*** this function support create and update */
  return [
    body("name").isString().optional({ nullable: false }).withMessage(errorCode.convenience.convenience_invalid_name),
    body("code")
      .optional({ nullable: false })
      .isIn(inconstants.convenience.code.all)
      .withMessage(errorCode.convenience.convenience_invalid_code),
    body("order").isInt({ min: 0 }).withMessage(errorCode.convenience.convenience_invalid_order),
  ];
};

export default {
  create: [create(), checkErrors],
  update: [paramId(), create(), checkErrors],
};
