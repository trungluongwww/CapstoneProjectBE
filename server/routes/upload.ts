import express, { Router } from "express";
import middleware from "./middleware";
import controllers from "../controllers";

export default (g: Router) => {
  let r = express.Router();
  g.use("/upload", r);

  r.post("/avatar", middleware.upload.singlePhoto, controllers.upload.avatar);

  r.post("/single-photo", middleware.upload.singlePhoto, controllers.upload.singlePhoto);

  r.post("/multiple-photo", middleware.upload.arrayPhoto, controllers.upload.multiplePhoto);
};
