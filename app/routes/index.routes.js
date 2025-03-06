import { Router } from "express";
import userRoutes from "./user.routes.js";
export const routes = Router();

routes.use('/users', userRoutes);
routes.get('/helloworld', (req, res) => {
    res.send('Hello World');
});

export default routes;