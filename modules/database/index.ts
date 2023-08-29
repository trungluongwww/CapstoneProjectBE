import { DataSource } from "typeorm";
import entities from "./entities";
import { IConfig } from "../../external_node/interfaces/config";

let dataSource: DataSource;

const connect = async (cfg: IConfig) => {
  dataSource = new DataSource({
    type: "postgres",
    host: cfg.postgres.url,
    port: Number(cfg.postgres.port),
    username: cfg.postgres.username,
    password: cfg.postgres.password,
    database: cfg.postgres.name,
    synchronize: true,
    logging: process.env.DEBUG ? true : false,
    entities: entities,
    migrations: [],
    subscribers: [],
  });

  // Connect
  try {
    await dataSource.initialize();
    console.log(`⚡️[postgres]: connected to ${cfg.postgres.port}`);

    // Set timezone
    await dataSource.manager.query(`SET timezone = '+00:00';`);

    // Run migration
  } catch (err) {
    console.log("err when connected to postgres postgres", err);
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
