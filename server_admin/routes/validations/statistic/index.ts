import { query } from "express-validator";
import response from "../../../../external_node/ultils/response";
import { checkErrors } from "../check-errors";

const all = () => {
  return [
    query("fromDate")
      .notEmpty()
      .withMessage("Datetime field is required")
      .bail()
      .custom((value) => {
        if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z?$/.test(value)) {
          throw new Error("Invalid fromDate format");
        }
        return true;
      }),
    query("toDate").custom((value) => {
      console.log(value)
      if (!value) {
        return true;
      }

      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z?$/.test(value)) {
        throw new Error("Invalid toDate format");
      }
      return true;
    }),
  ];
};

export default {
  all: [all(), checkErrors],
};
