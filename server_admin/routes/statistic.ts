import express, { Router } from "express";
import required from "./required";
import validations from "./validations";
import controllers from "../controllers";

export default (g: Router) => {
  let r = express.Router();
  g.use("/statistics", r);

  r.use(required.loginAdmin);

  r.get("", controllers.statistic.commonToday);

  r.get("/user", controllers.statistic.user);

  r.get("/room", controllers.statistic.room);
};
