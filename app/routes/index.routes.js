import { Router } from "express";
import userRoutes from "./user.routes.js";
export const routes = Router();

routes.use('/users', userRoutes);

export default routes;