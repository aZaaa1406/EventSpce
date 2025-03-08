import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { routes } from './routes/index.routes.js';
import { PORT, URL } from "./config/config.js";

import { sesionMid } from './middlewares/sesions.js';


export const app = express();

app.use(cors({
    origin: URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use(sesionMid)
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes)




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    }
);