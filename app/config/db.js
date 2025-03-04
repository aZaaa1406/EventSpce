import { createPool } from "mysql2/promise";
import { conection } from "./config.js";


export const pool = createPool({
    host: conection.HOST,
    user: conection.USER,
    password: conection.PASSWORD,
    database: conection.DB
})
