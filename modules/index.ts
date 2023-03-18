import database from "./database";
import {Express} from "express";
import config from "../external_node/config";
import response from "../external_node/ultilities/response";

export default {
    initialize: async (e: Express) => {
        const env = process.env;

        config.init(env)

        const cfg = config.get()

        await database.connect(cfg);

        response.init()
    },
};
