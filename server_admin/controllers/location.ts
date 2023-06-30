import { Request } from "express-jwt";
import { Response } from "express";
import services from "../services";
import response from "../../external_node/ultils/response";
import province from "../../internal/inconstants/province";

const allProvinces = async (req: Request, res: Response) => {
  const rs = await services.location.find.allProvince();

  return response.r200(res, rs);
};

const allDistricts = async (req: Request, res: Response) => {
  const { provinceId } = req.query;

  console.log(provinceId)

  const rs = await services.location.find.allDistrictByProvinceId(provinceId as string);

  return response.r200(res, rs);
};

const allWards = async (req: Request, res: Response) => {
  const { districtId } = req.query;

  const rs = await services.location.find.allWardByDistrictId(districtId as string);

  return response.r200(res, rs);
};

export default {
  allProvinces,
  allDistricts,
  allWards,
};
