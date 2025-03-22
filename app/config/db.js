import { createPool } from "mysql2/promise";
import { conection } from "./config.js";


export const pool = createPool({
    host: conection.HOST,
    user: conection.USER,
    password: conection.PASSWORD,
    database: conection.DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
    , connectTimeout: 15000
})

pool.query("SELECT 1 + 1 as result").then(([rows]) => {
    console.log("DB connected")
}).catch((error) => {
    console.log("Error in DB connection", error)
})
