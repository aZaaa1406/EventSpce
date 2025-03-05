import { Router } from "express";
import { registerUser} from "../controllers/user.controller.js";

const userRoutes = Router();
userRoutes.post('/register', registerUser);
userRoutes.get('/', (req, res) => {
    res.send('Hello World')
})

export default userRoutes;