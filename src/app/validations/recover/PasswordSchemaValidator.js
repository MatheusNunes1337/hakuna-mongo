const Joi = require('joi');

const passwordValidation = async (req, res, next) => {
 
    const schema = Joi.object({
        password: Joi.string().min(6).max(12).trim().required()
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;

    return next();

};

module.exports = passwordValidation;