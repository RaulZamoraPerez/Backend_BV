import { DataSource } from "typeorm";
import { User } from "./models/User";
import dotenv from 'dotenv'

dotenv.config({path:'.env'})
export const UdeaDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    entities: [
        User
    ],
    // synchronize: true,
  });