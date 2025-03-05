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
    

    async registerUser(userData){
        try {
            userData.email = userData.email.toLowerCase().trim();
            const emailExist = await this.findByEmail(userData.email);
            if (emailExist) {
                console.log("El email ya existe en la base de datos");
                return { success: false, message: "El email ya existe en la base de datos" };
            }

            console.log("Datos recibidos del servicio", userData);
            const hashPassword = await bcrypt.hash(userData.password, SALT);
            console.log(hashPassword);
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
            console.error("Error en registerUser:", error);
            throw new Error("Error en el servidor");
        }
    }
    async loginUser(userData){
        try {
            //le damoss formato al email
            userData.email = userData.email.toLowerCase().trim();
            //validamos que el email este asociado a un usuario
            const emailExist = await this.findByEmail(userData.email);
            if (!emailExist) {
                console.log("El email no existe en la base de datos");
                return { success: false, message: "El email no existe en la base de datos" };
            }


        } catch (error) {
            
        }
    }
    
}

export default new userModel();