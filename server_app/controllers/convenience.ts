import { Request } from "express-jwt";
import { Response } from "express";
import services from "../services";
import response from "../../external_node/ultils/response";

const all = async (req: Request, res: Response) => {
  const rs = await services.convenience.find.all();

  return response.r200(res, rs);
};

export default {
  all,
};
