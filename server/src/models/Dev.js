const Joi = require('joi');

const DevSchema = Joi.object({
    nome: Joi.string().trim().required(),
    sexo: Joi.string().length(1).required(),
    idade: Joi.number().required(),
    hobby: Joi.string().required(),
    datanascimento: Joi.date().greater('1-1-1900').less('now').required()
})

module.exports = DevSchema;