import express, { Router } from "express";
import required from "./required";
import controllers from "../controllers";
import validations from "./validations";

export default (g: Router) => {
  let r = express.Router();

  g.use("/rooms", r);

  r.use(required.loginAdmin);

  // post
  r.get("", ...validations.room.all, controllers.room.all);
  r.get("/:id", ...validations.room.detailById, controllers.room.detailById);

  r.patch("/:id/status", ...validations.room.changeStatus, controllers.room.changeStatus);
};
