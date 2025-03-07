import { Router } from "express";
import { registerUser, LoginUser, LogoutUser, forgotPassword, resetPassword} from "../controllers/user.controller.js";

const userRoutes = Router();
userRoutes.post('/register', registerUser);
userRoutes.post('/login', LoginUser)
userRoutes.post('/logout', LogoutUser)
userRoutes.post('/forgot_password', forgotPassword)
userRoutes.post('/reset-password', resetPassword)

export default userRoutes;