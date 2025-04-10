import {Router} from "express";
import {getSalones} from "../controllers/client.controller.js";

const clientRoutes = Router();

clientRoutes.get('/salones', getSalones)

export default clientRoutes;