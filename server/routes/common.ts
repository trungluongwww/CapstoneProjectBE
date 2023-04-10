import { Request, Response, Router } from "express";
import response from "../../external_node/ultils/response";

export default (r: Router) => {
  r.get("/ping", (req: Request, res: Response) => {
    return response.r404(res);
  });
};
