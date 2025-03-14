import Joi from "joi";

export const cartDto = Joi.object({
    user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.pattern.base': 'User ID must be a valid MongoDB ObjectId',
    }),
    products: Joi.array().items(
        Joi.object({
            product: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
                'string.pattern.base': 'Product ID must be a valid MongoDB ObjectId',
            }),
            quantity: Joi.number().integer().min(1).required().messages({
                'number.min': 'Quantity must be at least 1',
                'number.integer': 'Quantity must be an integer',
            }),
        }).required()
    ).min(1).required().messages({
        'array.min': 'At least one product must be included in the cart',
    }),
});
