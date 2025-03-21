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

pool.getConnection((err, conection)=>{
    if(err){
        console.log("Error al conectar la bdd", err);
        return
    }
    console.log("Conexion correcta a la bdd");
    pool.releaseConnection(conection);
})
