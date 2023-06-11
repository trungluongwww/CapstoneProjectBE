import express, { Router } from "express";
import validations from "./validations";
import controllers from "../controllers";

export default (g: Router) => {
  let r = express.Router();

  g.use("/users", r);

  // post
  r.post("/login", ...validations.user.login, controllers.user.login);
};
