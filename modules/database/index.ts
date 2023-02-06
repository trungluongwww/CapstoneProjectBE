import { DataSource } from "typeorm";
import entities from "./entities";
import {IConfig} from "../../node-sub-modules/interfaces/config";

let dataSource: DataSource;

const connect = async (cfg: IConfig) => {
  dataSource = new DataSource({
    type: "postgres",
    host: cfg.database.host,
    port: Number(cfg.database.port),
    username: cfg.database.username,
    password: cfg.database.password,
    database: cfg.database.name,
    synchronize: true,
    logging: false,
    entities: entities,
    migrations: [],
    subscribers: [],
  });

  // Connect
  try {
    await dataSource.initialize();
    console.log(`⚡️[postgres]: connected to ${cfg.database.port}`);

    // Set timezone
    await dataSource.manager.query(`SET timezone = '+00:00';`);

    // Run migration
  } catch (err) {
    console.log("err when connected to database postgres", err);
    process.exit(1);
  }
};

const getDataSource = (): DataSource => {
  return dataSource;
};

export default {
  connect,
  getDataSource,
};
