interface IConvenienceAllResponse {
  conveniences: Array<IConvenienceResponse>;
}

interface IConvenienceResponse {
  id: string;
  name: string;
  code: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IConvenienceCreatePayload {
  name: string;
  code: string;
  order: number;
}

interface IConvenienceUpdatePayload {
  name: string;
  code: string;
  order: number;
}

export { IConvenienceAllResponse, IConvenienceResponse, IConvenienceCreatePayload, IConvenienceUpdatePayload };
