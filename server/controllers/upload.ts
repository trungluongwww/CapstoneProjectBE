import { Response } from "express";
import { Request } from "express-jwt";
import services from "../services";
import response from "../../external_node/ultils/response";

const avatar = async (req: Request, res: Response) => {
  let file = req.file;

  const [rs, err] = await services.upload.avatar(file);
  if (err) {
    return response.r400(res, null, err.message);
  }

  return response.r200(res, rs);
};

const singlePhoto = async (req: Request, res: Response) => {
  let file = req.file;

  const [rs, err] = await services.upload.photo.single(file);
  if (err) {
    return response.r400(res, null, err.message);
  }

  return response.r200(res, rs);
};

const multiplePhoto = async (req: Request, res: Response) => {
  let files = req.files as Array<Express.Multer.File>;

  const [rs, err] = await services.upload.photo.multiple(files);
  if (err) {
    return response.r400(res, null, err.message);
  }

  return response.r200(res, rs);
};

const file = async (req: Request, res: Response) => {
  let file = req.file;

  const [rs, err] = await services.upload.file(file);
  if (err) {
    return response.r400(res, null, err.message);
  }

  return response.r200(res, rs);
};

const singlePrivatePhoto = async (req: Request, res: Response) => {
  let file = req.file;

  const [rs, err] = await services.upload.photo.singlePrivate(file);
  if (err) {
    return response.r400(res, null, err.message);
  }

  return response.r200(res, rs);
};

const multiplePrivatePhoto = async (req: Request, res: Response) => {
  let files = req.files as Array<Express.Multer.File>;

  const [rs, err] = await services.upload.photo.multiplePrivate(files);
  if (err) {
    return response.r400(res, null, err.message);
  }

  return response.r200(res, rs);
};

export default {
  avatar,
  singlePhoto,
  multiplePhoto,
  file,
  singlePrivatePhoto,
  multiplePrivatePhoto,
};
