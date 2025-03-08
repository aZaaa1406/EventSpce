import { pool } from "../config/db.js";
import bcrypt from 'bcrypt';
import { SALT } from "../config/config.js";
class userModel{
    //Funcion que verifica que la existencia del email en la BD
    async findByEmail(email) {
        console.log("email recibido del servicio", email);
        const query = "SELECT 1 FROM contacto WHERE email = ? LIMIT 1"; 
        const [rows] = await pool.execute(query, [email]);
        return rows.length > 0; 
    }
    async getPassword(email){
        //obtenemos el password del usuario y comparamos
        const query = "call eventspace.getPassword(?)"
        const [rows] = await pool.execute(query, [email]);
        const user = rows[0][0];

        return user.token
    }
    async getInfo(email){
        const query = "call eventspace.getInfoUser(?)"
        const [rows] = await pool.query(query, [email]);
        console.log(rows[0][0]);
        return rows[0][0];
    }
    

    async registerUser(userData){
        try {
            
            userData.email = userData.email.toLowerCase().trim();
            const emailExist = await this.findByEmail(userData.email);
            if (emailExist) {
                return { success: false, message: "El email ya existe en la base de datos" };
            }
            const hashPassword = await bcrypt.hash(userData.password, SALT);
            const [result] = await pool.query("CALL registerUser(?,?,?,?,?,?,?,?)",[
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
                return { success: true};
            } else {
                return { success: false};
            }
    
        } catch (error) {
            throw new Error("Error en el servidor");
        }
    }
    
    async LoginUser(userData){
        userData.email = userData.email.toLowerCase().trim();
        const passwordUser = await this.getPassword(userData.email);
        const verifyPassword = await bcrypt.compare(userData.password, passwordUser);
        if (!verifyPassword) {
            return false
        }
        const user = await this.getInfo(userData.email);
        return user;

    }

    async resetPassword(newPassword){
        const newPasswordHash = await bcrypt.hash(newPassword, SALT);
        const query = "UPDATE token SET token = where email = ?"
        const [rows] = await pool.execute(query, [newPasswordHash]);
        return rows.affectedRows > 0;
    }
    
}

export default new userModel();