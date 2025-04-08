
import { pool } from '../config/db.js';

class AdminModel {
    async getClients() {
        try {
            const query = "CALL getClients()";
            const result = await pool.query(query);
            return result[0][0]
        } catch (error) {
            throw new Error("Error al obtener los clientes: ");
        }
    }

    async getPropietarios() {
        try {
            const query = "CALL getPropietarios()";
            const result = await pool.query(query);
            return result[0][0]
        } catch (error) {
            throw new Error("Error al obtener los propietarios: " + error.message);

        }
    }

    async deleteUserById(id) {
        try {
            const query = "CALL deleteUser(?)";
            const result = await pool.query(query, [id]);
            console.log(result[0].affectedRows);
            if (result[0].affectedRows > 0) {
                return "Usuario eliminado correctamente";
            }
            return "No se encontró ningún usuario con ese ID";
            

        } catch (error) {
            throw new Error("Error al borrar el usuario: " + error.message);
        }
    }
}


export default new AdminModel();