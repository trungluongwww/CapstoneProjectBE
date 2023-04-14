import database from "./database";
import { Express } from "express";
import config from "../external_node/config";
import errorCode from "../internal/error-code";
import s3 from "../external_node/s3";
import upload from "../external_node/upload";

export default {
  initialize: async (e: Express) => {
    const env = process.env;

    config.init(env);

    const cfg = config.get();

    await database.connect(cfg);

    await s3.init(cfg);

    upload.initFolderUpload();

    errorCode.init();
  },
};
