import express, {Request, Response, Router} from "express";
import controllers from "../controllers";
import required from "./required";
import validations from "./validations";

export default (g: Router) => {
  let r = express.Router()
  g.use("/users", r);

  r.post("/", ...validations.user.create, controllers.user.create);
};
