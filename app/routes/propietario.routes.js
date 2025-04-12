import { Router } from "express";
import { getUser, getSalonesP } from "../controllers/propietario.controller.js";

const propietarioRoutes = Router();
propietarioRoutes.get("/getUser", getUser)
propietarioRoutes.get("/getSalones", getSalonesP)

export default propietarioRoutes;