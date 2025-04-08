import jwt from 'jsonwebtoken'

import userModels from "../models/user.models.js";
import { registerUserSchema, loginUserSchema, forgotPasswordSchema, resetPasswordSchema } from "../validations/user.validations.js";
import { SECRET_KEY_JWT, URL } from "../config/config.js";
import { sendMail } from "./mail.service.js";
class UserService {
    async registerUser(userData) {
        try {
            userData.email = userData.email.toLowerCase().trim();
            const { error } = registerUserSchema.validate(userData);
            if (error) {
                throw new Error(error);
            }
            const registerUser = await userModels.registerUser(userData);
            if (!registerUser) {
                throw new Error("Error al registrar el usuario");
            }
            return true;

        } catch (e) {
            throw e;
        }
    }
    async LoginUser(userData) {
        try {
            userData.email = userData.email.toLowerCase().trim();
            const { error } = loginUserSchema.validate(userData);
            if (error) {
                throw new Error("Error en la validacion del esquema");
            }
            const user = await userModels.LoginUser(userData);
            const token = jwt.sign(user, SECRET_KEY_JWT, { expiresIn: "1h" });
            const rol = await userModels.getRol(userData.email);
            const dataUser = {
                token: token,
                rol: rol
            }
            return dataUser;

        } catch (error) {
            throw error
        }
    }
    async forgotPassword(dEmail) {
        try {
            const email = dEmail.toLowerCase().trim()
            console.log(email);
            const { error } = forgotPasswordSchema.validate({ email });
            if (error) {
                throw new Error("Error en la validacion del esquema");
            }
            const emailValidate = await userModels.findByEmail(email);
            if (!emailValidate) {
                throw new Error("El email no existe en la base de datos");
            }
            const user = await userModels.getForgotPassword(email);
            if (!user) {
                throw new Error("Error al obtener la informacion del usuario");
            }
            const token = jwt.sign({ user }, SECRET_KEY_JWT, { expiresIn: "15m" });

            sendMail(user.email, "Recuperar contraseña", `Haz click en el siguiente enlace para restablecer tu contraseña: <a href=${URL}/reset-password/${token}>Restablecer contraseña</a>`);

            return token;
        } catch (error) {
            throw error
        }

    }

    async resetPassword(newPassword, tokenP) {
        try {
            const tokenValidate = jwt.verify(tokenP, SECRET_KEY_JWT);
            if (!tokenValidate) {
                throw new Error("Ocurrio un error");
            }
            const { error } = resetPasswordSchema.validate({ newPassword });
            if (error) {
                throw new Error(error)
            }
            const email = tokenValidate.user.email
            const result = await userModels.resetPassword(newPassword, email);
            return result;
        } catch (error) {
            throw new Error("Error al restablecer la contraseña")
        }

    }
    async getInfo(token) {
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

    async updateUser(userId, updateFields) {
        try {
            const user = await userModels.updateUserModel(userId, updateFields);
            if (!user) {
                throw new Error("Error al actualizar el usuario");
            }
            const newToken = jwt.sign(user, SECRET_KEY_JWT, { expiresIn: "1h" });
            return newToken;
        } catch (error) {
            throw error
        }
    }
}

export default new UserService();