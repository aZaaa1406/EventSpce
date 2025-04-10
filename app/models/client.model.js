import { pool } from '../config/db.js';
class ClientModel {
    async getSalones (){
        const query = "Call getInfoSalones()"
        const result = await pool.query(query)
        return result[0][0]
    }
}

export default new ClientModel();