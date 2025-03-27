import userService from "../services/user.service.js";

export const registerUser = async (req,res)=>{
    try {
        const userData = req.body;
        console.log(userData);
        const register = await userService.registerUser(userData);
        console.log(register);
        return res.status(200).json({
            status:200,
            message:"Usuario registrado correctamente"
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}
export const LoginUser = async (req,res)=>{
    try {
        const userData = req.body;
        const login = await userService.LoginUser(userData);
        console.log(login);
        return res
        .cookie("access_token", login, {
            http_only: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'strict',
            masAge: 1000*60*60
        }).status(200).json({
            status:200,
            message:"Usuario logeado correctamente"
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

export const LogoutUser = async (req,res)=>{
    try {
        return res
        .clearCookie("access_token")
        .status(200)
        .json({
            status:200,
            message:"Usuario deslogeado correctamente"
        })
    } catch (error) {
        throw error;
    }
}

export const forgotPassword = async (req, res)=>{
    try{
        console.log(req.body.email);
        const dEmail = req.body.email;
        const token = await userService.forgotPassword(dEmail);
        if(!token){
            return res.status(400).json({
                status:400,
                message:"El email no existe en la base de datos"
            })
        }
        return res
        .cookie('reset_token', token,{
            http_only: true,
            secure: false,
            sameSite: 'strict',
            masAge: 1000*60*15
        })
        .status(200)
        .json({
            status:200,
            message:"Se ha enviado un correo para restablecer la contraseña"
        })
    }catch(e){
        throw e;
    }
}

export const resetPassword = async (req, res)=>{
    try {
        const token = req.cookies.reset_token;
        const newPassword = req.body.password;
    
        const reset = await userService.resetPassword(newPassword, token);
        return res
        .clearCookie("reset_token")
        .status(200)
        .json({
            status:200,
            message:"Contraseña restablecida correctamente"
        })
    } catch (error) {
        throw new Error("Error al restablecer la contraseña")
    }
    
    
}