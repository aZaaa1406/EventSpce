import { Router } from "express";
import userRoutes from "./user.routes.js";
import adminRoutes from "./admin.routes.js";
import clientRoutes from "./client.routes.js";
export const routes = Router();

routes.use('/users', userRoutes);
routes.use('/admin', adminRoutes);
routes.use('/client', clientRoutes);
routes.get('/', (req, res) => {
    res.send('Hello World').status(200).json({
        status:200,
        message:"Hello World"
    });
});
routes.use('/', (req, res)=>{
    res.send("Hello World");
})

export default routes;