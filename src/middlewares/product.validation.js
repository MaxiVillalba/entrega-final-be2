import Joi from 'joi';

const productValidationSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
    code: Joi.string().alphanum().required(),
    category: Joi.string().optional(),
    thumbnails: Joi.array().items(Joi.string().uri()).optional(),
});

const validateProduct = (req, res, next) => {
    const { error } = productValidationSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

export default validateProduct;
