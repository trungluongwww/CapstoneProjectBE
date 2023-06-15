import express, { Router } from "express";
import required from "./required";
import validations from "./validations";
import controllers from "../controllers";

export default (g: Router) => {
  let r = express.Router();
  g.use("/conversations", r);

  // get TODO: validation
  r.get("/", required.login, controllers.conversation.all);
  r.get("/detail", required.login, ...validations.conversation.findDetail, controllers.conversation.findDetail);
  r.get("/:id/messages", required.login, ...validations.conversation.allMessage, controllers.conversation.allMessage);
  r.get("/:id", required.login, ...validations.conversation.detail, controllers.conversation.detailByID);

  // post
  r.post("/:id/message", ...validations.conversation.createMessage, controllers.conversation.newMessage);
};
