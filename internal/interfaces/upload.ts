interface IUploadAvatarResponse {
  name: string;
  originName: string;
  width: number;
  height: number;
  url: string;
}

interface IUploadOthersResponse {
  link: string;
}

interface IUploadSinglePhotoResponse {
  name: string;
  originName: string;
  width: number;
  height: number;
  url: string;
  others: IUploadOthersResponse;
}

interface IUploadMultiplePhotoResponse {
  photos: Array<IUploadSinglePhotoResponse>;
  total: number;
}

interface IUploadThumbnailResponse {
  name: string;
  originName: string;
  width: number;
  height: number;
  url: number;
}

export {
  IUploadAvatarResponse,
  IUploadThumbnailResponse,
  IUploadSinglePhotoResponse,
  IUploadMultiplePhotoResponse,
  IUploadOthersResponse,
};
