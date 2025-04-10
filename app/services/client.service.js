import clientModel from "../models/client.model.js";

class ClientService {
    async getSalones(){
        const result = await clientModel.getSalones();
        console.log("Resultado obtenido en el servicio:", result);
        return result;
    }
}

export default new ClientService();