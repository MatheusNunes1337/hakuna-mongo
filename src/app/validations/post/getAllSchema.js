const Joi = require('joi');

const getAllPostsValidation = async (req, res, next) => {
    const schema = Joi.object({
        offset: Joi.number().min(0),
        limit: Joi.number().min(0),
        content: Joi.string().max(2000).trim()
    });

    const { error } = await schema.validate(req.query, { abortEarly: false });
    if (error) throw error;

    return next();

};

module.exports = getAllPostsValidation;