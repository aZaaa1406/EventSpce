import { pool } from "../config/db.js";
import bcrypt from 'bcrypt';
import { SALT } from "../config/config.js";
import { ConnectionError, InternalServerError, ValidationError } from "../utils/errors.js";
class userModel {
    //Funcion que verifica que la existencia del email en la BD
    async findByEmail(email) {
        console.log("email recibido del servicio", email);
        const query = "SELECT 1 FROM contacto WHERE email = ? LIMIT 1";
        const [rows] = await pool.query(query, [email]);
        return rows.length > 0;
    }

    async getPassword(email) {
        //obtenemos el password del usuario y comparamos
        console.log("Datos recibidos en el modelo", email);
        console.log("Ejecutando query");
        const query = "CALL getPassword(?)"
        const [rows] = await pool.query(query, [email]);

        console.log("query ejecutada");
        console.log(rows);
        const user = rows[0][0];
        console.log(user.token);
        return user.token
    }
    
    async getInfo(email) {
        console.log(email);
        const query = "call getInfoUser(?)"
        const [rows] = await pool.query(query, [email]);
        console.log("filas obtenidas", rows[0][0]);
        return rows[0][0];
    }

    async registerUser(userData) {
        try {
            console.log(userData);
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
            console.log(verifyPassword);
            if (!verifyPassword) {
                throw new Error("Contraseña incorrecta");
            }
            const user = await this.getInfo(userData.email);
            console.log(user);
            return user;
        } catch (error) {
            throw error
        }

    }

    async resetPassword(newPassword) {
        try {
            const newPasswordHash = await bcrypt.hash(newPassword, SALT);
            const query = "UPDATE token SET token = where email = ?"
            const [rows] = await pool.execute(query, [newPasswordHash]);
            return rows.affectedRows > 0;
        } catch (error) {
            throw error
        }
    }

}

export default new userModel();