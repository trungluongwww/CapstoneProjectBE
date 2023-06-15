import dao from "../../dao";
import { District, Province, Ward } from "../../../modules/database/entities";
import {
  IDistrictResponse,
  ILocationAllDistrict,
  ILocationAllProvince,
  ILocationAllWard,
  IProvinceResponse,
  IWardResponse,
} from "../../../internal/interfaces/location";
import times from "../../../external_node/ultils/times";

const isValidLocation = async (provinceId: string, districtId: string, wardId: string): Promise<boolean> => {
  const promiseP = dao.location.find.countProvinceById(provinceId);
  const promiseD = dao.location.find.countDistrictById(districtId, provinceId);
  const promiseW = dao.location.find.countWardById(wardId, districtId);

  const [countP, countD, countW] = await Promise.all([promiseP, promiseD, promiseW]);

  return countP > 0 && countD > 0 && countW > 0;
};

const convertProvinceModelToResponse = (province: Province): IProvinceResponse | undefined => {
  if (!province) {
    return;
  }
  return {
    id: province.id,
    name: province.name,
    code: province.code,
    createdAt: times.newDateTimeUTC7(province.createdAt),
    updatedAt: times.newDateTimeUTC7(province.updatedAt),
  } as IProvinceResponse;
};

const convertDistrictModelToResponse = (dist: District): IDistrictResponse | undefined => {
  if (!dist) {
    return;
  }
  return {
    id: dist.id,
    name: dist.name,
    code: dist.code,
    provinceId: dist.provinceId,
    createdAt: times.newDateTimeUTC7(dist.createdAt),
    updatedAt: times.newDateTimeUTC7(dist.updatedAt),
  } as IDistrictResponse;
};

const convertWardModelToResponse = (ward: Ward): IWardResponse | undefined => {
  if (!ward) {
    return;
  }
  return {
    id: ward.id,
    name: ward.name,
    code: ward.code,
    districtId: ward.districtId,
    createdAt: times.newDateTimeUTC7(ward.createdAt),
    updatedAt: times.newDateTimeUTC7(ward.updatedAt),
  } as IWardResponse;
};

const allProvince = async (): Promise<ILocationAllProvince> => {
  const [rs, err] = await dao.location.find.allProvinces();

  if (!rs) {
    return {
      provinces: [],
      total: 0,
    } as ILocationAllProvince;
  }

  return {
    provinces: rs?.map((r) => convertProvinceModelToResponse(r)),
    total: rs?.length | 0,
  } as ILocationAllProvince;
};

const allDistrictByProvinceId = async (id: string): Promise<ILocationAllDistrict> => {
  const [rs, err] = await dao.location.find.allDistrictByProvinceId(id);

  if (!rs) {
    return {
      districts: [],
      total: 0,
    } as ILocationAllDistrict;
  }

  return {
    districts: rs?.map((r) => convertDistrictModelToResponse(r)),
    total: rs?.length,
  } as ILocationAllDistrict;
};

const allWardByDistrictId = async (id: string): Promise<ILocationAllWard> => {
  const [rs, err] = await dao.location.find.allWardByDistrictId(id);

  if (!rs) {
    return {
      wards: [],
      total: 0,
    } as ILocationAllWard;
  }

  return {
    wards: rs?.map((r) => convertWardModelToResponse(r)),
    total: rs?.length,
  } as ILocationAllWard;
};

export default {
  isValidLocation,
  convertProvinceModelToResponse,
  convertDistrictModelToResponse,
  convertWardModelToResponse,
  allProvince,
  allDistrictByProvinceId,
  allWardByDistrictId,
};
