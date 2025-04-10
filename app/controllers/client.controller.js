import clientService from "../services/client.service.js";

export const getSalones = async (req, res)=>{
    const result = await clientService.getSalones()
    console.log(result);
    res.status(200).json({
        status: "success",
        data: result
    });
}