import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 4000;

export const conection ={
    PORT: process.env.DB_PORT || 3306,
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "root",
    DB: process.env.DB_NAME || "eventspace"
}

export const SALT = parseInt(process.env.SALT);

export const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;