const Joi = require('joi');

const createUserValidation = async (req, res, next) => {
 
    const schema = Joi.object({
        username: Joi.string().trim().min(6).max(12).required(),
        email: Joi.string().email().trim().required(),
        password: Joi.string().trim().min(6).max(12).required(),
        type: Joi.string().valid('student', 'teacher').required(),
        area: Joi.string().trim().min(3)
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;

    return next();

};

module.exports = createUserValidation;