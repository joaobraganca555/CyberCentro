import "reflect-metadata"
import { DataSource } from "typeorm"

//Using .env configs
require('dotenv').config();
export const AppDataSource = new DataSource({
    type: "mssql", //Can't be used from .env
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: true,
    logging: false,
    entities: ["src/entity/**.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
});
// Can be initializated here!