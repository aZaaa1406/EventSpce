import joi from 'joi';

export const registerUserSchema = joi.object({
    email: joi.string().email().required().case('lower'),
    telefono: joi.string().min(10).max(10).required(),
    password: joi.string().min(6).max(8).pattern(new RegExp(`/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#\$%&])[a-zA-Z0-9#\$%&]{6,8}$/`)).required(),
    nombre: joi.string().required(),
    appat: joi.string().required(),
    apmat: joi.string().required(),
    fechaNac: joi.date().required(),
    rol: joi.string().required()
})

export const loginUserSchema = joi.object({
    email: joi.string().email().required().case('lower'),
    password: joi.string().min(6).max(8).pattern(new RegExp(`/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#\$%&])[a-zA-Z0-9#\$%&]{6,8}$/`)).required()
})