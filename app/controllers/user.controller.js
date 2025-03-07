import userService from "../services/user.service.js";

export const registerUser = async (req,res)=>{
    try {
        const userData = req.body;
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
export const LoginUser = async (req,res)=>{
    try {
        const userData = req.body;
        const login = await userService.LoginUser(userData);

        return res
        .cookie("access_token", login, {
            http_only: true,
            secure: false,
            sameSite: 'strict',
            masAge: 1000*60*60
        }).status(200).json({
            status:200,
            message:"Usuario logeado correctamente"
        })
    } catch (error) {
        
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
    const token = req.cookies.reset_token;
    if(!token){
        return res.status(400).json({
            status:400,
            message:"Error al restablecer la contraseña"
        })
    }
    const newPassword = req.body.password;

    const reset = await userService.resetPassword(newPassword, token);
    if(!reset){
        return res.status(400).json({
            status:400,
            message:"Error al restablecer la contraseña"
        })
    }
    return res
    .clearCookie("reset_token")
    .status(200)
    .json({
        status:200,
        message:"Contraseña restablecida correctamente"
    })
}