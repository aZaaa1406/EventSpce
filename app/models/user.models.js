import { pool } from "../config/db.js";
import bcrypt from 'bcrypt';
import { SALT } from "../config/config.js";
class userModel{
    //Funcion que verifica que la existencia del email en la BD
    async findByEmail(email) {
        const query = "SELECT 1 FROM user WHERE email = ? LIMIT 1"; 
        const [rows] = await pool.execute(query, [email]);
        return rows.length > 0; 
    }
    

    async registerUser(userData){
        try {
        const hashPassword = await bcrypt.hash(userData.password, SALT);
        const [result] = await pool.query("CALL registerUser(?,?,?,?,?,?,?, ?)",[
            userData.email,
            userData.telefono,
            hashPassword,
            userData.nombre,
            userData.appat,
            userData.apmat,
            userData.fechaNac,
            userData.rol
        ])
        return true;
        } catch (e) {
            throw new Error("Error en el servidor")
        }
    }
}

export default new userModel();