import express, { Router } from "express";
import required from "./required";
import validations from "./validations";
import controllers from "../controllers";

export default (g: Router) => {
  let r = express.Router();
  g.use("/conversations", r);

  // get TODO: validation
  r.get("/detail", required.login, controllers.conversation.findDetail);
  r.get("/:id", required.login, controllers.conversation.detailByID);

};