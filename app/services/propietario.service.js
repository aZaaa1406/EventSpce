import propietarioModel from "../models/propietario.model.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../config/config.js";

class PropietarioService {
    async getUser(token) {
        try {
            const tokenValidate = jwt.verify(token, SECRET_KEY_JWT);
            if (!tokenValidate) {
                throw new Error("Ocurrio un error");
            }
            console.log(tokenValidate);
            return tokenValidate
        } catch (error) {
            throw new Error("Error al obtener la informacion del usuario")
        }
    }

    async getSalones (token){
        try {
            const tokenValidate = jwt.verify(token, SECRET_KEY_JWT)
            const idUser = tokenValidate.id_user
            const res = await propietarioModel.getSalonesP(idUser)
            return res
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default new PropietarioService();