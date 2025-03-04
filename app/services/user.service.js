import userModels from "../models/user.models.js";

class UserService{
    async registerUser(userData){
        try{

            userData.email = userData.email.toLowerCase().trim();
            const emailExist = await userModels.findByEmail(userData.email);
            
            const registerUser = await userModels.registerUser(dataUser);
            if(!registerUser){
                return false;
            }
            return true;

        }catch(e){
            throw new Error("Error en el servidor")
        }
    }

}

export default new UserService();