import Joi from "joi";

export const productDto = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    description: Joi.string().optional(),
    stock: Joi.number().integer().min(0).required(),
});
