import Joi from "joi";

export const productDto = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.min': 'Product name must be at least 3 characters long',
        'string.max': 'Product name must be less than 100 characters long',
    }),
    price: Joi.number().positive().required().messages({
        'number.positive': 'Price must be a positive number',
    }),
    description: Joi.string().optional().allow(''),
    stock: Joi.number().integer().min(0).required().messages({
        'number.min': 'Stock must be at least 0',
        'number.integer': 'Stock must be an integer',
    }),
});
