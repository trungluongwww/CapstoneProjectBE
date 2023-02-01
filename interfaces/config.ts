interface IConfig {
    port: string
    jwtSecretKey: string
    database: IConfigPostgres
}

interface IConfigPostgres {
    port: string
    username: string
    password: string
    name: string
    host: string
}

export {
    IConfig,
    IConfigPostgres
}