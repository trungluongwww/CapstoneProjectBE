import {IConfig, IConfigPostgres} from "../interfaces/config";

let config: IConfig

const init = (env: NodeJS.ProcessEnv) => {

    // common
    config = {
        port: env.PORT,
        jwtSecretKey: env.SECRET_JWT,
    } as IConfig

    // config database
    config.database = {
        name: env.POSTGRES_DB_NAME,
        port: env.POSTGRES_PORT,
        host: env.POSTGRES_HOST,
        password: env.POSTGRES_USER_PASSWORD,
        username: env.POSTGRES_USER_NAME
    } as IConfigPostgres
}

const get = (): IConfig => {
    return config
}

export default {
    init,
    get
}