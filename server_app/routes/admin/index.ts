import express, { Router } from "express";

export default (g: Router) => {
  let r = express.Router();

  g.use("/admin", r);
};
