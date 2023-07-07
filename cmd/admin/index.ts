import express, { Response } from "express";
import dotenv from "dotenv";
import serverApp from "../../server_app";
import modules from "../../modules";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import serverAdmin from "../../server_admin";
import { Request } from "express-jwt";
import response from "../../external_node/ultils/response";

async function init() {
  const app = express();

  dotenv.config();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("tiny"));

  let httpServer = await modules.initialize(app);

  await serverAdmin(app);

  app.use("*", (req: Request, res: Response) => {
    return response.r404(res, "The route not found");
  });

  const port = process.env.PORT || 4000;

  httpServer.listen(port, () => {
    console.log("⚡ server listen on port: ", port);
  });
}

init().then();
