const Joi = require('joi');

const updatePostValidation = async (req, res, next) => {
 
    const schema = Joi.object({
        content: Joi.string().trim().max(2000)
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;

    return next();

};

module.exports = updatePostValidation;