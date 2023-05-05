interface IUploadOthersResponse {
  link: string;
}

interface IUploadSingleFileResponse {
  name: string;
  originName: string;
  width: number;
  height: number;
  type: string;
  url: string;
  others: IUploadOthersResponse;
  thumbnail?: IUploadThumbnailResponse;
}

interface IUploadSingleFileRequest {
  name: string;
  originName: string;
  width: number;
  height: number;
  type: string;
  url: string;
}

interface IUploadMultipleFileResponse {
  photos: Array<IUploadSingleFileResponse>;
  total: number;
}

interface IUploadThumbnailResponse {
  name: string;
  originName: string;
  width: number;
  height: number;
  url: string;
}

export {
  IUploadSingleFileRequest,
  IUploadMultipleFileResponse,
  IUploadThumbnailResponse,
  IUploadOthersResponse,
  IUploadSingleFileResponse,
};
