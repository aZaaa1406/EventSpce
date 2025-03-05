import userModels from "../models/user.models.js";

class UserService{
    async registerUser(userData){
        try{
            userData.email = userData.email.toLowerCase().trim();
            const emailExist = await userModels.findByEmail(userData.email);
            if (emailExist) {
                console.log("El email ya existe en la base de datos");
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

}

export default new UserService();