import { Express } from "express";
import router from "./routes";
import recommendation from "../modules/recommendation";
import sesEmail from "../external_node/ses-email";
import config from "../external_node/config";
import cronjob from "../modules/cronjob";

export default async (app: Express) => {
  await recommendation.init();

  await sesEmail.init(config.get());

  await cronjob.init();

  router(app);
};
