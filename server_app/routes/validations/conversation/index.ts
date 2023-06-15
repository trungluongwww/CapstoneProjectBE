import { body, query } from "express-validator";
import errorCode from "../../../../internal/error-code";
import inconstants from "../../../../internal/inconstants";
import { checkErrors, paramId } from "../check-errors";
import response from "../../../../external_node/ultils/response";

const createMessage = () => {
  return [
    body("type")
      .optional({ nullable: false })
      .isIn(inconstants.message.type.all)
      .withMessage(errorCode.conversation.CONVERSATION_MESSAGE_TYPE_INVALID),
  ];
};

const findDetail = () => {
  return [query("targetId").optional({ nullable: false }).isMongoId().withMessage(response.common.commonInvalidID)];
};

export default {
  createMessage: [createMessage(), paramId(), checkErrors],
  findDetail: [findDetail(), checkErrors],
  detail: [paramId(), checkErrors],
  allMessage: [paramId(), checkErrors],
};
