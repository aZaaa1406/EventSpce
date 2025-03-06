import userModels from "../models/user.models.js";
import { registerUserSchema, loginUserSchema} from "../validations/user.validations.js";
import jwt from 'jsonwebtoken'
import { SECRET_KEY_JWT } from "../config/config.js";
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

}

export default new UserService();