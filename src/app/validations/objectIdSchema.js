const Joi = require('joi');
const { getObjectIdPattern } = require('../utils/getPatterns');

const objectIdValidation = async (req, res, next) => {
 
    const params = Object.values(req.params);

    const schema = Joi.object({
      id: Joi.array().items(Joi.string().regex(getObjectIdPattern()))
    });

    const { error } = await schema.validate({ id: params }, { abortEarly: false });
    if (error) throw error;

    return next();

};

module.exports = objectIdValidation;