import userService from "../services/user.service.js";

export const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData);
        const register = await userService.registerUser(userData);
        console.log(register);
        return res.status(200).json({
            status: 200,
            message: "Usuario registrado correctamente"
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}
export const LoginUser = async (req, res) => {
    try {
        const userData = req.body;
        const login = await userService.LoginUser(userData);
        return res
            .cookie("access_token", login, {
                httpOnly: process.env.NODE_ENV === 'production' ? true : false,
                secure: process.env.NODE_ENV === 'production' ? true : false,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : undefined,
                path: "/",
                maxAge: 1000 * 60 * 60 // 1 hora
            })
            .status(200)
            .json({
                status: 200,
                message: "Usuario logeado correctamente"
            });

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

export const LogoutUser = async (req, res) => {
    try {
        return res
            .clearCookie("access_token")
            .status(200)
            .json({
                status: 200,
                message: "Usuario deslogeado correctamente"
            })
    } catch (error) {
        throw error;
    }
}

export const forgotPassword = async (req, res) => {
    try {
        console.log(req.body.email);
        const dEmail = req.body.email;
        const token = await userService.forgotPassword(dEmail);
        if (!token) {
            return res.status(400).json({
                status: 400,
                message: "El email no existe en la base de datos"
            })
        }
        return res
            .cookie('reset_token', token, {
                http_only: true,
                secure: false,
                sameSite: 'strict',
                masAge: 1000 * 60 * 15
            })
            .status(200)
            .json({
                status: 200,
                message: "Se ha enviado un correo para restablecer la contraseña"
            })
    } catch (e) {
        throw e;
    }
}

export const resetPassword = async (req, res) => {
    try {
        const token = req.cookies.reset_token;
        const newPassword = req.body.password;

        console.log("token obtenido de las cookies: ", token);
        console.log("Contraseña obtenida del body: ", newPassword);
        const reset = await userService.resetPassword(newPassword, token);
        console.log("Contraseña restablecida: ", reset);
        if (reset) {
            return res
                .clearCookie("reset_token")
                .status(200)
                .json({
                    status: 200,
                    message: "Contraseña restablecida correctamente"
                })
        }
        return res.status(400).json({
            status: 400,
            message: "Error al restablecer la contraseña"
        })
    } catch (error) {
        throw new Error("Error al restablecer la contraseña")
    }
}

export const getInfoUser = async (req, res) => {
    try {
        const token = req.cookies.access_token;
        const user = await userService.getInfo(token)
        console.log("Informacion obtenida", user);
        return res.status(200).json({
            status: 200,
            user: user
        })
    } catch (error) {
        throw new Error("Error al obtener la informacion del usuario")
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id_user, ...updateFields } = req.body; // Obtener el ID y los campos de actualización del body

        if (!id_user) {
            return res.status(400).json({ error: "El ID del usuario es necesario" }); // Validación si no se proporciona el ID
        }

        // Llamar al servicio para actualizar el usuario
        const result = await userService.updateUser(id_user, updateFields);

        // Responder con el mensaje de éxito
        res.cookie("access_token", result, {
            httpOnly: process.env.NODE_ENV === 'production' ? true : false,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : undefined,
            path: "/",
            maxAge: 1000 * 60 * 60 // 1 hora
        }).status(200).json({ message: "Usuario actualizado correctamente", result });
    } catch (error) {
        // Manejo de errores específicos
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Log de errores inesperados
        console.error("Error en updateUserController:", error);

        // Responder con error general
        res.status(500).json({ error: "Error interno del servidor" });
    }
}