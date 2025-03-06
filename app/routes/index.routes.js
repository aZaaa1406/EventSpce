import { Router } from "express";
import userRoutes from "./user.routes.js";
export const routes = Router();

routes.use('/users', userRoutes);
routes.get('/', (req, res) => {
    res.send('Hello World').status(200).json({
        status:200,
        message:"Hello World"
    });
});

export default routes;