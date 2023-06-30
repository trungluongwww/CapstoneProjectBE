import express, { Router } from "express";
import validations from "./validations";
import controllers from "../controllers";
import required from "./required";

export default (g: Router) => {
  let r = express.Router();

  g.use("/users", r);

  // post
  r.get("", required.loginAdmin, controllers.user.findAll);
};
