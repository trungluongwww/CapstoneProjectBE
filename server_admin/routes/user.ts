import express, { Router } from "express";
import validations from "./validations";
import controllers from "../controllers";
import required from "../../server_admin/routes/required";

export default (g: Router) => {
  let r = express.Router();

  g.use("/users", r);

  // post
  r.post("/login", ...validations.user.login, controllers.user.login);
  r.get("/me", required.loginAdmin, controllers.user.me);
};
