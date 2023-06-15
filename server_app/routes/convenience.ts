import express, { Router } from "express";
import required from "./required";
import controllers from "../controllers";
import validations from "./validations";

export default (g: Router) => {
  let r = express.Router();
  g.use("/conveniences", r);

  // get
  r.get("/", required.login, controllers.convenience.all);
};
