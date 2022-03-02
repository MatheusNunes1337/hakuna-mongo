const Joi = require('joi');

const createPostValidation = async (fields) => {
    const schema = Joi.object({
        content: Joi.string().trim().max(2000).required()
    });

    const { error } = await schema.validate(fields, { abortEarly: false });
    if (error) throw error;
};

module.exports = createPostValidation;