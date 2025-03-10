import Joi from "joi";

export const cartDto = Joi.object({
    user: Joi.string().required(),
    products: Joi.array().items(
        Joi.object({
            product: Joi.string().required(),
            quantity: Joi.number().integer().min(1).required(),
        })
    ).required(),
});
