import Joi from "joi";

export const orderDto = Joi.object({
    user: Joi.string().required(),
    business: Joi.string().required(),
    products: Joi.array().items(
        Joi.object({
            product: Joi.string().required(),
            quantity: Joi.number().integer().min(1).required(),
        })
    ).required(),
    totalPrice: Joi.number().positive().required(),
    status: Joi.string().valid("pending", "shipped", "delivered", "cancelled").default("pending"),
});
