import propietarioService from "../services/propietario.service.js";

export const getUser = async (req, res) => {
    try {
        const token = req.cookies.access_token;
        const user = await propietarioService.getUser(token)
        console.log("Informacion obtenida", user);
        return res.status(200).json({
            status: 200,
            user: user
        })
    } catch (error) {
        throw new Error("Error al obtener la informacion del usuario")
    }
}

export const getSalonesP = async (req, res)=>{
    try{
        const token = req.cookies.access_token;
        console.log(token);
        const data = await propietarioService.getSalones(token)
        return res.status(200).json({
            data
        })
        
    }catch (error) {
        console.log(error);
    }
}