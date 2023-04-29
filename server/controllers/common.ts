import { Request } from "express-jwt";
import { Response } from "express";
import services from "../services";
import response from "../../external_node/ultils/response";

const allFilters = async (req: Request, res: Response) => {
  const rs = services.common.filter.all();

  return response.r200(res, rs);
};

export default {
  allFilters,
};
