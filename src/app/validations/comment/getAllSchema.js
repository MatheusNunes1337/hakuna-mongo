const Joi = require('joi');

const getAllCommentsValidation = async (req, res, next) => {
    const schema = Joi.object({
        content: Joi.string().max(300).trim()
    });

    const { error } = await schema.validate(req.query, { abortEarly: false });
    if (error) throw error;

    return next();

};

module.exports = getAllCommentsValidation;