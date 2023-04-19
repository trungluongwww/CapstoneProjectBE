import { Response, Router } from "express";
import { Request } from "express-jwt";
import response from "../../external_node/ultils/response";
import required from "./required";

export default (r: Router) => {
  r.get("/ping", required.login, (req: Request, res: Response) => {
    return response.r200(res, { user: req.auth, ping: "pong" });
  });
};
