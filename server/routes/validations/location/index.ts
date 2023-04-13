import { body, query } from "express-validator";
import errorcode from "../../../../internal/errorcode";
import { checkErrors, paramId } from "../check-errors";
import inconstants from "../../../../internal/inconstants";
import response from "../../../../external_node/ultils/response";

const allDistricts = () => {
  return [query("provinceId").isMongoId().withMessage(response.common.commonInvalidID)];
};

const allWards = () => {
  return [query("districtId").isMongoId().withMessage(response.common.commonInvalidID)];
};

export default {
  allDistricts: [allDistricts(), checkErrors],
  allWards: [allWards(), checkErrors],
};
