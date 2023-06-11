import express, { Router } from "express";
import required from "./required";
import validations from "./validations";
import controllers from "../controllers";

export default (g: Router) => {
  let r = express.Router();
  g.use("/statistics", r);

  r.get("", required.loginAdmin, ...validations.statistic.all, controllers.statistic.all);
};
