import express, { Router } from "express";
import controllers from "../controllers";

export default (g: Router) => {
  let r = express.Router();
  g.use("/migrations", r);

  // r.post("/locations", controllers.migration.migrationLocation);
};
