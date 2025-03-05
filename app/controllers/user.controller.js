import userService from "../services/user.service.js";

export const registerUser = async (req,res)=>{
    try {
        const userData = req.body;
        console.log({userData});
        const register = await userService.registerUser(userData);

        console.log(register);
        if(register){
            return res.status(200).json({
                status:200,
                message:"Usuario registrado correctamente"
            })
        }
        return res.status(400).json({
            status:400,
            message:"Error al registrar usuario"
        })
    } catch (error) {
        
    }
}