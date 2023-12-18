const joi = require("joi");

const schemaClientes = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
  }),

  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
  }),

  cpf: joi
    .string()
    .regex(/^\d{11}$/)
    .message("O campo deve ser um CPF válido com 11 dígitos numéricos")
    .required()
    .messages({
      "any.required": "O campo CPF é obrigatório",
      "string.empty": "O campo CPF é obrigatório",
    }),

  cep: joi.string().required().messages({
    "any.required": "O campo CEP é obrigatório",
    "string.empty": "O campo CEP é obrigatório",
  }),

  rua: joi.string().required().messages({
    "any.required": "O campo Rua é obrigatório",
    "string.empty": "O campo Rua é obrigatório",
  }),

  numero: joi.string().required().messages({
    "any.required": "O campo Número é obrigatório",
    "string.empty": "O campo Número é obrigatório",
  }),

  bairro: joi.string().required().messages({
    "any.required": "O campo Bairro é obrigatório",
    "string.empty": "O campo Bairro é obrigatório",
  }),

  cidade: joi.string().required().messages({
    "any.required": "O campo Cidade é obrigatório",
    "string.empty": "O campo Cidade é obrigatório",
  }),

  estado: joi.string().required().messages({
    "any.required": "O campo Estado é obrigatório",
    "string.empty": "O campo Estado é obrigatório",
  }),
});

module.exports = schemaClientes;
