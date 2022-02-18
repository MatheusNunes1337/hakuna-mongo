const Joi = require('joi');

const updateUserValidation = async (req, res, next) => {
 
    const schema = Joi.object({
        username: Joi.string().trim().min(6).max(12),
        email: Joi.string().email().trim(),
        password: Joi.string().trim().min(6).max(12),
        type: Joi.string().valid('student', 'teacher'),
        area: Joi.string().trim().min(3),
        contributionPoints: Joi.number().min(0),
        profilePic: Joi.string().trim().min(1)
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;

    return next();

};

module.exports = updateUserValidation;