const Joi = require('joi');

const updateCommentValidation = async (req, res, next) => {
 
    const schema = Joi.object({
        content: Joi.string().trim().max(300)
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;

    return next();

};

module.exports = updateCommentValidation;