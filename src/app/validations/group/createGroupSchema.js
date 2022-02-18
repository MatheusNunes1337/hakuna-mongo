const Joi = require('joi');

const createGroupValidation = async (req, res, next) => {
 
    const schema = Joi.object({
        name: Joi.string().trim().max(25).required(),
        description: Joi.string().max(100).trim().required(),
        discipline: Joi.string().trim().required(),
        topics: Joi.array().items(Joi.string().trim()).min(1).max(3).unique().required(),
        isPublic: Joi.boolean().required(),
        password: Joi.string().trim().min(6).allow(null)
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;

    return next();

};

module.exports = createGroupValidation;