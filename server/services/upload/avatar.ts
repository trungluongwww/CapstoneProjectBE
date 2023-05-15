import upload from "../../../external_node/upload";
import path from "path";
import constants from "../../../external_node/constants";
import { IUploadSingleFileResponse } from "../../../internal/interfaces/upload";
import s3 from "../../../external_node/s3";
import errorCode from "../../../internal/error-code";
import pfile from "../../../external_node/ultils/pfile";

export default async (
  file: Express.Multer.File | null | undefined
): Promise<[IUploadSingleFileResponse | null, Error | null]> => {
  console.log(file);

  if (!file) {
    return [null, Error(errorCode.upload.UPLOAD_INVALID_FILE)];
  }

  // file info
  const extension = path.extname(file.filename).replace(".", "");
  const contentType = constants.upload.contentTypePrefix.image + extension;
  const key = file.filename;

  // prepare info
  const resizeWidth = constants.upload.resize.avatar.width;
  const resizeHeight = constants.upload.resize.avatar.height;
  const resizeName =
    path.parse(file.filename).name + `_${resizeWidth.toString()}_${resizeHeight.toString()}` + `.${extension}`;

  // path
  const basePath = upload.getPathFolderUpload() + `/${file.filename}`;
  const resizePath = upload.getPathFolderUpload() + `/${resizeName}`;

  // run
  try {
    let [w, h, err] = await pfile.photo.resizeImage(basePath, resizeWidth, resizeHeight, resizePath);

    if (err) {
      return [null, err];
    }

    const result = {
      name: resizeName,
      originName: file.originalname,
      width: w,
      height: h,
      type: constants.upload.type.photo,
    } as IUploadSingleFileResponse;

    // upload s3
    [result.url, err] = await s3.uploadObjectPublic(upload.getPathFileFromFolderUpload(resizeName), key, contentType);
    if (err) {
      return [null, err];
    }

    return [result, null];
  } catch (e: unknown) {
    return [null, e as Error];
  } finally {
    upload.removeFileFromFolderUpload([file.filename, resizeName]).then();
  }
};
