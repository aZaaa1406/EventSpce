import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 4000;

console.log(process.env.DB_PORT, process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);

export const conection ={
    PORT: Number(process.env.DB_PORT) || 3306,
    HOST: process.env.DB_HOST || "127.0.0.1",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "root",
    DB: process.env.DB_NAME || "eventspace"
    
}



export const SALT = parseInt(process.env.SALT);

export const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export const URL = "http://localhost:3000"

export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;