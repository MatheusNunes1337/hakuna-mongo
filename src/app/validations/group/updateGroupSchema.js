const Joi = require('joi');

const updateGroupValidation = async (req, res, next) => {
 
    const schema = Joi.object({
        name: Joi.string().trim().max(25),
        description: Joi.string().max(300).trim(),
        discipline: Joi.string().trim(),
        maxMembers: Joi.number().integer().max(500),
        topics: Joi.array().items(Joi.string().trim().required()).min(1).max(5).unique(),
        isPublic: Joi.boolean(),
        password: Joi.string().trim().min(6).allow(null)
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    
    if (error) throw error;

    return next();
};

module.exports = updateGroupValidation;