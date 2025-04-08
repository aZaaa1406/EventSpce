import adminService from "../services/admin.service.js"


export const getClients =  async (req, res)=>{
    const result = await adminService.getAllClients()
    res.status(200).json({
        status: 200,
        message: "Clients fetched successfully",
        data: result
    })
}

export const getPropietarios =  async (req, res)=>{
    const result = await adminService.getAllPropietarios()
    res.status(200).json({
        status: 200,
        message: "Propietarios fetched successfully",
        data: result
    })
}

export const deleteClient = async (req, res) => {
    const { id } = req.params;
    const result = await adminService.deleteUsers(id)
    res.status(200).json({
        status: 200,
        message: "Client deleted successfully",
        result: result
    });
    console.log(id);
}