const Joi = require('joi');

const updatePostValidation = async (req, res, next) => {
 
    const schema = Joi.object({
        content: Joi.string().trim().max(2000),
        likes: Joi.string().valid('enable', 'disable'),
        deslikes: Joi.string().valid('enable', 'disable'),
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;

    return next();

};

module.exports = updatePostValidation;