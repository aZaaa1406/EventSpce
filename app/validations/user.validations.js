import joi from 'joi';

export const registerUserSchema = joi.object({
    email: joi.string()
        .email().required().case('lower'),

    telefono: joi.string()
        .min(10).max(10).required(),

    password: joi.string()
        .min(6).max(12)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#\$%&])[A-Za-z\d#\$%&]{6,12}$/)
        .required(),
    nombre: joi.string().required(),

    appat: joi.string().required(),

    apmat: joi.string().required(),

    fechaNac: joi.date()
        .max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)) // Resta 18 años a la fecha actual
        .required(),
    rol: joi.string().required()
});


export const loginUserSchema = joi.object({
    email: joi.string()
        .email().required().case('lower'),

    password: joi.string()
        .min(6).max(12)
        .required()
});


export const forgotPasswordSchema = joi.object({
    email: joi.string()
        .email().required().case('lower')
});

export const resetPasswordSchema = joi.object({
    newPassword: joi.string()
        .min(6).max(12)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#\$%&])[A-Za-z\d#\$%&]{6,12}$/)
        .required()
});