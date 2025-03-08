import { Router } from "express";
import userRoutes from "./user.routes.js";
export const routes = Router();

routes.use('/users', userRoutes);
<<<<<<< HEAD
routes.get('/', (req, res) => {
    res.send('Hello World').status(200).json({
        status:200,
        message:"Hello World"
    });
});
=======
routes.use('/', (req, res)=>{
    res.send("Hello World");
})
>>>>>>> develop

export default routes;