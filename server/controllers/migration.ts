import { Response } from "express";
import { Request } from "express-jwt";
import services from "../services";
import response from "../../external_node/ultilities/response";

const migrationLocation = async (req: Request, res: Response) => {
  await services.migration.migrationLocations().then();

  return response.r200(res);
};

export default {
  migrationLocation,
};
