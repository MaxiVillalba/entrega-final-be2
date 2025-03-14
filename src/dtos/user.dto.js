import Joi from "joi";

export const userDto = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be less than 100 characters long',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address',
    }),
    role: Joi.string().valid("user", "admin", "guest").default("user").optional(),
});
