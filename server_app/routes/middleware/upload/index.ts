import photo from "./photo";
import video from "./video";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import response from "../../../../external_node/ultils/response";
import file from "./file";

const singlePhoto = (req: Request, res: Response, next: NextFunction) => {
  photo.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return response.r400(res, null, err.message);
    } else if (err) {
      // An unknown error occurred when uploading.
      return response.r400(res, null, err.message);
    }

    next();
  });
};

const singleFile = (req: Request, res: Response, next: NextFunction) => {
  file.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return response.r400(res, null, err.message);
    } else if (err) {
      // An unknown error occurred when uploading.
      return response.r400(res, null, err.message);
    }

    next();
  });
};

const arrayPhoto = (req: Request, res: Response, next: NextFunction) => {
  photo.array("files", 5)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return response.r400(res, null, err.message);
    } else if (err) {
      // An unknown error occurred when uploading.
      return response.r400(res, null, err.message);
    }

    next();
  });
};

const singleVideo = (req: Request, res: Response, next: NextFunction) => {
  video.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return response.r400(res, null, err.message);
    } else if (err) {
      // An unknown error occurred when uploading.
      return response.r400(res, null, err.message);
    }

    next();
  });
};

export default {
  singlePhoto,
  arrayPhoto,
  singleVideo,
  singleFile,
};
