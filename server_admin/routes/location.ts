import express, { Router } from "express";
import validations from "./validations";
import controllers from "../controllers";

export default (g: Router) => {
  let r = express.Router();
  g.use("/locations", r);

  // get
  r.get("/provinces", controllers.location.allProvinces);
  r.get("/districts", ...validations.location.allDistricts, controllers.location.allDistricts);
  r.get("/wards", ...validations.location.allWards, controllers.location.allWards);
};
