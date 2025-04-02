import { pool } from "../config/db.js";
import bcrypt from 'bcrypt';
import { SALT } from "../config/config.js";
import { ConnectionError, InternalServerError, ValidationError } from "../utils/errors.js";
class userModel {
    //Funcion que verifica que la existencia del email en la BD
    async findByEmail(email) {
        const query = "SELECT 1 FROM contacto WHERE email = ? LIMIT 1";
        const [rows] = await pool.query(query, [email]);
        return rows.length > 0;
    }

    async getPassword(email) {
        //obtenemos el password del usuario y comparamos
        const query = "CALL getPassword(?)"
        const [rows] = await pool.query(query, [email]);
        const user = rows[0][0];
        return user.token
    }

    async getUserById(id){
        const query = "CALL getUserById(?)"
        const [rows] = await pool.query(query, [id]);
        const user = rows[0][0];
        return user;
    }

    //funcion para obtener el usuario mediante el correo
    async getForgotPassword(email) {
        const query = "CALL getPassword(?)"
        const [rows] = await pool.query(query, [email]);
        const user = rows[0][0];
        return user;
    }
    async getInfo(email) {
        const query = "call getInfoUser(?)"
        const [rows] = await pool.query(query, [email]);
        return rows[0][0];
    }


    async registerUser(userData) {
        try {
            userData.email = userData.email.toLowerCase().trim();
            const emailExist = await this.findByEmail(userData.email);
            if (emailExist) {
                throw new Error("El email ya existe en la base de datos");
            }
            const hashPassword = await bcrypt.hash(userData.password, SALT);
            const [result] = await pool.query("CALL registerUser(?,?,?,?,?,?,?,?)", [
                userData.email,
                userData.telefono,
                hashPassword,
                userData.nombre,
                userData.appat,
                userData.apmat,
                userData.fechaNac,
                userData.rol
            ]);

            if (result.affectedRows > 0) {
                throw new Error("Error al registrar el usuario");
            } else {
                return true
            }

        } catch (error) {
            throw error
        }
    }

    async LoginUser(userData) {
        try {
            userData.email = userData.email.toLowerCase().trim();
            const emailExist = await this.findByEmail(userData.email);
            if (!emailExist) {
                throw new Error("El email no existe en la base de datos");
            }
            const passwordUser = await this.getPassword(userData.email);
            const verifyPassword = await bcrypt.compare(userData.password, passwordUser);
            if (!verifyPassword) {
                throw new Error("Contraseña incorrecta");
            }
            const user = await this.getInfo(userData.email);
            return user;
        } catch (error) {
            throw error
        }

    }

    async resetPassword(newPassword, email) {
        try {
            const newPasswordHash = await bcrypt.hash(newPassword, SALT);
            const lastPaswword = await this.getPassword(email);
            const verifyPassword = await bcrypt.compare(newPassword, lastPaswword);
            if (verifyPassword) {
                throw new Error("La nueva contraseña no puede ser la misma que la anterior")
            }
            const query = "CALL resetPassword(?,?)"
            const [rows] = await pool.query(query, [email, newPasswordHash]);
            return rows.affectedRows > 0;
        } catch (error) {
            throw new Error("Error al restablecer la contraseña")
        }
    }
    async updateUserModel(userId, updateFields) {
        try {
            if (Object.keys(updateFields).length === 0) {
                throw new ValidationError("No hay campos para actualizar");
            }

            // Construir la consulta de actualización
            const fieldsToUpdate = Object.entries(updateFields).map(([key, value]) => `${key}=?`);
            const values = Object.values(updateFields); // Extraer solo los valores

            let updateQuery = `UPDATE user SET ${fieldsToUpdate.join(", ")} WHERE id_user=?`;
            values.push(userId); // Añadir el ID del usuario como último valor

            // Ejecutar la consulta
            const results = await pool.query(updateQuery, values);

            if (results.affectedRows === 0) {
                throw new ValidationError("No se encontró el usuario");
            }

            const updatedUser = await this.getUserById(userId); // Obtener el usuario actualizado
            return updatedUser;
        } catch (error) {
            if (error) {
                throw error;
            }
            console.error("Error en updateUser:", error);
            throw new InternalServerError("Error al actualizar el usuario");
        }
    }

}

export default new userModel();