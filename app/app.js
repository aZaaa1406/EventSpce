import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { routes } from './routes/index.routes.js';
import { PORT, URL } from "./config/config.js";
import { sesionMid } from './middlewares/sesions.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import { corsMiddleware } from './middlewares/cors.js';


export const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(sesionMid)
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(cors({
    origin: function(origin, callback) {
        if (URL.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Permite la solicitud
        } else {
            callback(new Error('Not allowed by CORS')); // Bloquea la solicitud si no está permitido
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use('/api', routes)




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    }
);