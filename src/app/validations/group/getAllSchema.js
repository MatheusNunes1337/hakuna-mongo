const Joi = require('joi');

const getAllGroupsValidation = async (req, res, next) => {
 
    const schema = Joi.object({
        offset: Joi.number().min(0),
        limit: Joi.number().min(0),
        name: Joi.string().trim().max(25),
        isPublic: Joi.boolean(),
        discipline: Joi.string().trim(),
        topics: Joi.string().trim(),
        members: Joi.string().trim(),
        favorites: Joi.string().trim()
    });

    const { error } = await schema.validate(req.query, { abortEarly: false });
    if (error) throw error;

    return next();

};

module.exports = getAllGroupsValidation;