import { Router } from "express";
import { getClients, getPropietarios, deleteClient} from "../controllers/admin.controller.js";

const adminRoutes = Router();

adminRoutes.get('/clients', getClients)
adminRoutes.get('/propietarios', getPropietarios)

adminRoutes.delete('/user/:id', deleteClient)

export default adminRoutes;