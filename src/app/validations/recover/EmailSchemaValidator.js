const Joi = require('joi');

const emailValidation = async (req, res, next) => {
 
    const schema = Joi.object({
        receiverEmail: Joi.string().email().trim().required()
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;

    return next();

};

module.exports = emailValidation;