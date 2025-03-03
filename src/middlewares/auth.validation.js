import Joi from 'joi';

const authValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const validateAuth = (req, res, next) => {
    const { error } = authValidationSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

export default validateAuth;
