import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 4000;


export const conection ={
    PORT: Number(process.env.DB_PORT) || 3306,
    HOST: process.env.DB_HOST || "127.0.0.1",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "root",
    DB: process.env.DB_NAME || "eventspace"
    
}



export const SALT = parseInt(process.env.SALT);

export const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

// Usa el valor de ALLOWEDORIGINS si está definido, de lo contrario usa localhost como valor por defecto
export const URL = process.env.URL_FRONTEND || "http://localhost:3000"

console.log(URL);

export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;