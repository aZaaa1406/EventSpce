import jwt from 'jsonwebtoken'

import userModels from "../models/user.models.js";
import { registerUserSchema, loginUserSchema, forgotPasswordSchema, resetPasswordSchema} from "../validations/user.validations.js";
import { SECRET_KEY_JWT, URL} from "../config/config.js";
import { sendMail } from "./mail.service.js";
class UserService{
    async registerUser(userData){
        try{
            console.log(userData);
            userData.email = userData.email.toLowerCase().trim();
            const {error} = registerUserSchema.validate(userData);
            if (error) {
                throw error
                console.log("error en la validacion del esquema");
                return false
            }
            const registerUser = await userModels.registerUser(userData);
            if (!registerUser) {
                return false
            }
            return true;

        }catch(e){
            throw e;
        }
    }
    async LoginUser(userData){
        try {
            console.log(userData);
            userData.email = userData.email.toLowerCase().trim();
            const {error} = loginUserSchema.validate(userData);
            if (error) {
                console.log("Error en la validacion del esquema");
                console.log(error);
                return false
            }
            const user = await userModels.LoginUser(userData);
            console.log("Datos recibidos del modelo", user);
            // if (!user) {
            //     console.log("Error en el modelo");
            //     return false
            // }
            if (!user) {
                console.log("Error en el modelo");
                return false;
            }
            const token = jwt.sign(user, SECRET_KEY_JWT, { expiresIn: "1h" });
            console.log("Datos que vamos a pasar", {user});
            console.log("Token generado", token);
            return token;
            
        } catch (error) {
            throw error
        }
    }
    async forgotPassword(dEmail){
        const email = dEmail.toLowerCase().trim()
        console.log(email);
        const {error}= forgotPasswordSchema.validate({email});
        if (error) {
            return false
        }
        const emailValidate = await userModels.findByEmail(email);
        if (!emailValidate) {
            return false
        }
        const user = await userModels.getInfo(email);
        if (!user) {
            return false
        }
        const token = jwt.sign({user}, SECRET_KEY_JWT, {expiresIn: "15m"});
        
        sendMail(user.email, "Recuperar contraseña", `Haz click en el siguiente enlace para restablecer tu contraseña: <a href=${URL}/reset-password/${token}>Restablecer contraseña</a>`);

        return token;
    }

    async resetPassword(newPassword, token){
        const tokenValidate = jwt.verify(token, SECRET_KEY_JWT);
        if (!tokenValidate) {
            return false
        }
        const {error} = resetPasswordSchema.validate({newPassword});
        if (error) {
            return false
        }
        const newPasswordHash = await bcrypt.hash(newPassword, SALT);
        const query = "UPDATE token SET token = ? where email = ?"
        const result = await pool.query(query, [newPasswordHash, tokenValidate.email]);
        if (result.affectedRows < 0) {
            return false
        }
        return true;

    }

}

export default new UserService();