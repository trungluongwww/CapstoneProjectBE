import { Request, Response, Router } from "express";
import controllers from "../controllers";
import required from "./required";

export default (r: Router) => {
  r.post("/users", controllers.user.create);
};
