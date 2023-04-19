import { Response } from "express";
import { Request } from "express-jwt";
import services from "../services";
import response from "../../external_node/ultils/response";

const migrationLocation = async (req: Request, res: Response) => {
  let { key } = req.body;

  if (key == "trungluongwww") {
    await services.migration.migrationLocations().then();

    return response.r200(res);
  }

  return response.r400(res);
};

export default {
  migrationLocation,
};
