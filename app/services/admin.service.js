import adminModel from "../models/admin.model.js";

class AdminService {
    async getAllClients(){
        const result = await adminModel.getClients()
        return result
    }

    async getAllPropietarios(){
        const result = await adminModel.getPropietarios()
        return result
    }
    async deleteUsers(id){
        const result = await adminModel.deleteUserById(id)
        return result
    }
}

export default new AdminService();