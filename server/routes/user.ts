import express, { Request, Response, Router } from "express";
import controllers from "../controllers";
import required from "./required";
import validations from "./validations";

export default (g: Router) => {
  let r = express.Router();
  g.use("/users", r);

  // get
  r.get("/profile", ...validations.user.profile, controllers.user.profile);
  r.get("/me", required.login, ...validations.user.profile, controllers.user.profile);

  // post
  r.post("/", ...validations.user.create, controllers.user.create);
  r.post("/login", ...validations.user.login, controllers.user.login);

  // put
  r.put("/", required.login, ...validations.user.update, controllers.user.update);
};
