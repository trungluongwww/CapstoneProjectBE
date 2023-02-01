import database from "./database";
import {Express} from "express";
import config from "../config";

export default {
    initialize: async (e: Express) => {
        const env = process.env;

        config.init(env)

        const cfg = config.get()

        await database.connect(cfg);
    },
};
