import express from 'express';
import { routes } from './routes/index.routes.js';
export const app = express();

app.use('/api', routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
