import { Router } from "express";
import { registerUser, LoginUser, LogoutUser} from "../controllers/user.controller.js";

const userRoutes = Router();
userRoutes.post('/register', registerUser);
userRoutes.post('/login', LoginUser)
userRoutes.post('/logout', LogoutUser)

export default userRoutes;