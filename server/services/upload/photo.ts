import {
  IUploadSingleFileResponse,
  IUploadOthersResponse,
  IUploadMultipleFileResponse,
} from "../../../internal/interfaces/upload";
import errorcode from "../../../internal/errorcode";
import path from "path";
import constants from "../../../external_node/constants";
import upload from "../../../external_node/upload";
import pfile from "../../../external_node/ultils/pfile";
import s3 from "../../../external_node/s3";

const single = async (
  file: Express.Multer.File | null | undefined
): Promise<[IUploadSingleFileResponse | null, Error | null]> => {
  if (!file) {
    return [null, Error(errorcode.upload.UPLOAD_INVALID_FILE)];
  }

  // file info
  const extension = path.extname(file.filename).replace(".", "");
  const contentType = constants.upload.contentTypePrefix.image + extension;
  const key = file.filename;

  // prepare info
  const resizeWidth = constants.upload.resize.photo.width;
  const resizeHeight = constants.upload.resize.photo.height;
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

const multiple = async (
  files: Array<Express.Multer.File> | undefined | null
): Promise<[IUploadMultipleFileResponse | null, Error | null]> => {
  if (!files) {
    return [null, Error(errorcode.upload.UPLOAD_INVALID_FILE)];
  }

  const result = {
    photos: [],
    total: 0,
  } as IUploadMultipleFileResponse;

  for (let file of files) {
    let [res, err] = await single(file);
    if (err || !res) {
      return [null, err];
    }
    result.photos.push(res);
  }

  result.total = result.photos.length;

  return [result, null];
};

const singlePrivate = async (
  file: Express.Multer.File | null | undefined
): Promise<[IUploadSingleFileResponse | null, Error | null]> => {
  if (!file) {
    return [null, Error(errorcode.upload.UPLOAD_INVALID_FILE)];
  }

  // file info
  const extension = path.extname(file.filename).replace(".", "");
  const contentType = constants.upload.contentTypePrefix.image + extension;
  const key = file.filename;

  // prepare info
  const resizeWidth = constants.upload.resize.photo.width;
  const resizeHeight = constants.upload.resize.photo.height;
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
      others: {
        link: "",
      } as IUploadOthersResponse,
    } as IUploadSingleFileResponse;

    // upload s3
    [result.others.link, err] = await s3.uploadObjectPrivate(
      upload.getPathFileFromFolderUpload(resizeName),
      key,
      contentType
    );
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

const multiplePrivate = async (
  files: Array<Express.Multer.File> | undefined | null
): Promise<[IUploadMultipleFileResponse | null, Error | null]> => {
  if (!files) {
    return [null, Error(errorcode.upload.UPLOAD_INVALID_FILE)];
  }

  const result = {
    photos: [],
    total: 0,
  } as IUploadMultipleFileResponse;

  for (let file of files) {
    let [res, err] = await singlePrivate(file);
    if (err || !res) {
      return [null, err];
    }
    result.photos.push(res);
  }

  result.total = result.photos.length;

  return [result, null];
};

export default {
  single,
  multiple,
  multiplePrivate,
  singlePrivate,
};
