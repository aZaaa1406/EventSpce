export const PORT = process.env.PORT || 4000;

export const conection ={
    PORT: process.env.PORT || 3306,
    HOST: process.env.HOST || "localhost",
    USER: process.env.USER || "root",
    PASSWORD: process.env.PASSWORD || "root",
    DB: process.env.DB || "eventspace"
}

export const SALT = process.env.SALT;