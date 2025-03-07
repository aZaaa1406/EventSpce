import jwt from 'jsonwebtoken'

import userModels from "../models/user.models.js";
import { registerUserSchema, loginUserSchema, forgotPasswordSchema, resetPasswordSchema} from "../validations/user.validations.js";
import { SECRET_KEY_JWT, URL} from "../config/config.js";
import { sendMail } from "./mail.service.js";
class UserService{
    async registerUser(userData){
        try{
            userData.email = userData.email.toLowerCase().trim();
            const {error} = registerUserSchema.validate(userData);
            if (error) {
                return { success: false };
            }

            const emailExist = await userModels.findByEmail(userData.email);
            if (emailExist) {
                throw new Error("El email ya existe en la base de datos");
            }
            const registerUser = await userModels.registerUser(userData);
            console.log(registerUser);
            if (!registerUser.success) {
                return false;
            }
            return true;

        }catch(e){
            throw new Error("Error en el servidor")
        }
    }
    async LoginUser(userData){
        try {
            userData.email = userData.email.toLowerCase().trim();
            const {error} = loginUserSchema.validate(userData);
            if (error) {
                return { success: false };
            }
            const user = await userModels.LoginUser(userData);
            if (!user) {
                return { success: false };
            }
            const token = jwt.sing({user}, SECRET_KEY_JWT, {expiresIn: "1h"}, );

            return token;
            
        } catch (error) {
            
        }
    }
    async forgotPassword(dEmail){
        const email = dEmail.toLowerCase().trim()
        console.log(email);
        const {error}= forgotPasswordSchema.validate({email});
        if (error) {
            return false;
        }
        const emailValidate = await userModels.findByEmail(email);
        if (!emailValidate) {
            return false;
        }
        const user = await userModels.getInfo(email);
        console.log("El usuario es",user);
        if (!user) {
            return false;
        }
        const token = jwt.sign({user}, SECRET_KEY_JWT, {expiresIn: "15m"});
        
        sendMail(user.email, "Recuperar contraseña", `Haz click en el siguiente enlace para restablecer tu contraseña: <a href=${URL}/reset-password/${token}>Restablecer contraseña</a>`);

        return token;
    }

    async resetPassword(newPassword, token){
        const tokenValidate = jwt.verify(token, SECRET_KEY_JWT);
        if (!tokenValidate) {
            return false;
        }
        const {error} = resetPasswordSchema.validate({newPassword});
        if (error) {
            return false;
        }
        const newPasswordHash = await bcrypt.hash(newPassword, SALT);
        const query = "UPDATE token SET token = ? where email = ?"
        const result = await pool.query(query, [newPasswordHash, tokenValidate.email]);
        if (result.affectedRows < 0) {
            return false;
        }
        return true

    }

}

export default new UserService();