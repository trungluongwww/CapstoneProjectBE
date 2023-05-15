import express, { Router } from "express";
import required from "./required";
import controllers from "../controllers";
import validations from "./validations";

export default (g: Router) => {
  let r = express.Router();
  g.use("/conveniences", r);

  // get
  r.get("/", required.login, controllers.convenience.all);

  r.post("/", required.login, ...validations.convenience.create, controllers.convenience.create);

  r.put("/:id", required.login, ...validations.convenience.update, controllers.convenience.update);
};
