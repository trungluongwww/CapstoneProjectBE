import express, { Router } from "express";
import validations from "./validations";
import controllers from "../controllers";
import required from "./required";
import { paramId } from "./validations/check-errors";

export default (g: Router) => {
  let r = express.Router();
  g.use("/rooms", r);

  // get
  r.get("/", required.login, ...validations.room.all, controllers.room.all);

  // post
  r.post("/", required.login, ...validations.room.create, controllers.room.create);
  r.post("/:id/file", required.login, ...validations.room.addFile, controllers.room.addFile);
  r.post("/:id/comment", required.login, ...validations.room.addComment, controllers.room.addComment);

  // put
  r.put("/:id", required.login, ...validations.room.update, controllers.room.update);

  // patch
  r.patch("/:id/status", required.login, ...validations.room.changeStatus, controllers.room.changeStatus);

  // delete
  r.delete("/:id/file", required.login, ...validations.room.removeFile, controllers.room.removeFile);
};
