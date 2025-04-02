import { Router } from "express";
import { registerUser, LoginUser, LogoutUser, forgotPassword, resetPassword, getInfoUser, updateUser} from "../controllers/user.controller.js";

const userRoutes = Router();
userRoutes.post('/register', registerUser);
userRoutes.post('/login', LoginUser)
userRoutes.post('/logout', LogoutUser)
userRoutes.post('/forgot-password', forgotPassword)
userRoutes.post('/reset-password', resetPassword)
userRoutes.get('/getInfo', getInfoUser)
userRoutes.put('/updateUser', updateUser)

export default userRoutes;