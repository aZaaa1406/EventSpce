import express from 'express';
import { routes } from './routes/index.routes.js';

import { PORT } from "./config/config.js";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes)




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    }
);