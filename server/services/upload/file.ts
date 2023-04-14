import { IUploadOthersResponse, IUploadSingleFileResponse } from "../../../internal/interfaces/upload";
import errorCode from "../../../internal/error-code";
import constants from "../../../external_node/constants";
import upload from "../../../external_node/upload";
import s3 from "../../../external_node/s3";

export default async (
  file: Express.Multer.File | undefined
): Promise<[IUploadSingleFileResponse | null, Error | null]> => {
  if (!file) {
    return [null, Error(errorCode.upload.UPLOAD_INVALID_FILE)];
  }

  // run
  try {
    const result = {
      name: file.filename,
      originName: file.originalname,
      width: 0,
      height: 0,
      type: constants.upload.type.file,
      others: {
        link: "",
      } as IUploadOthersResponse,
    } as IUploadSingleFileResponse;

    // upload s3
    let [url, err] = await s3.uploadObjectPrivate(upload.getPathFileFromFolderUpload(file.filename), file.filename, "");
    if (err) {
      return [null, err];
    }

    result.others.link = url;

    return [result, null];
  } catch (e: unknown) {
    return [null, e as Error];
  } finally {
    upload.removeFileFromFolderUpload([file.filename]).then();
  }
};
