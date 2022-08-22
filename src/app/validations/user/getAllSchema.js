const Joi = require('joi');

const getAllUsersValidation = async (req, res, next) => {
 
    const schema = Joi.object({
        offset: Joi.number().min(0),
        limit: Joi.number().min(0),
        username: Joi.string().trim().min(1),
        email: Joi.string().email().trim(),
        type: Joi.string().valid('student', 'teacher')
    });

    const { error } = await schema.validate(req.query, { abortEarly: false });
    if (error) throw error;

    return next();

};

module.exports = getAllUsersValidation;