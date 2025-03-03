import Joi from 'joi';

const cartProductSchema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
});

const validateCartProduct = (req, res, next) => {
    const { error } = cartProductSchema.validate(req.params); // Validar parámetros (productId, quantity)
    
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

export default validateCartProduct;
