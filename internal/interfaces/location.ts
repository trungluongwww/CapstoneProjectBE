interface IProvinceResponse {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IDistrictResponse {
  id: string;
  name: string;
  code: string;
  provinceId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IWardResponse {
  id: string;
  name: string;
  code: string;
  districtId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ILocationAllProvince {
  provinces: Array<IProvinceResponse>;
  total: number;
}

interface ILocationAllDistrict {
  districts: Array<IDistrictResponse>;
  total: number;
}

interface ILocationAllWard {
  wards: Array<IWardResponse>;
  total: number;
}

export {
  IProvinceResponse,
  IDistrictResponse,
  IWardResponse,
  ILocationAllProvince,
  ILocationAllDistrict,
  ILocationAllWard,
};
