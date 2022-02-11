const Joi = require('joi');

const loginValidation = async (req, res, next) => {
 
    const schema = Joi.object({
        username: Joi.string().trim().min(6).required(),
        password: Joi.string().trim().min(6).required()
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;

    return next();

};

module.exports = loginValidation;