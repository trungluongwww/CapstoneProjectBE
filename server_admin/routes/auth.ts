import express, { Router } from "express";
import validations from "./validations";
import controllers from "../controllers";
import required from "../../server_admin/routes/required";

export default (g: Router) => {
  let r = express.Router();

  g.use("/auth", r);

  // post
  r.post("/login", ...validations.user.login, controllers.auth.login);
  r.get("/me", required.loginAdmin, controllers.auth.me);
};
