import {pool} from '../config/db.js';

class PropietarioModel{
    async getSalonesP (id_user){
        try {
            const query = "CALL getSalonesPropietario(?)"
            const res = await pool.query(query, [id_user])
            console.log(res[0][0]);
            return res[0][0]
        } catch (error) {
            console.log(error);
        }
    }
}

export default new PropietarioModel();