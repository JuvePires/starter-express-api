const joi = require("joi");

const criarMensagem = (campo) => ({
  "number.positive": `O campo ${campo} precisa ser um número positivo`,
  "number.base": `O campo ${campo} precisa ser um número`,
  "any.required": `O campo ${campo} é obrigatório`,
  "number.empty": `O campo ${campo} é obrigatório`,
});

const criarEsquemaNumeroPositivo = (campo) =>
  joi.number().positive().required().messages(criarMensagem(campo));

const converterValorMonetario = (valorMonetario) => {
  const valorNumerico = Number(valorMonetario.replace(/[^0-9.-]+/g, ""));
  return isNaN(valorNumerico) ? null : valorNumerico;
};

const schemaProdutos = joi
  .object({
    descricao: joi.string().required().messages({
      "any.required": "O campo nome é obrigatório",
      "string.empty": "O campo nome é obrigatório",
    }),

    quantidade_estoque: criarEsquemaNumeroPositivo("quantidade_estoque"),

    valor: joi
      .alternatives()
      .try(
        joi.number().positive().precision(2).required().messages({
          "number.positive": "O campo valor deve ser um número positivo",
          "number.base": "O campo valor deve ser um número",
          "number.precision":
            "O campo valor deve ter até dois dígitos após o ponto decimal",
        }),
        joi.string().custom((value, helpers) => {
          const valorConvertido = converterValorMonetario(value);
          return isNaN(valorConvertido) || valorConvertido < 0
            ? helpers.error("string.base")
            : valorConvertido;
        }, "Converter Valor Monetário")
      )
      .required(),

    categoria_id: criarEsquemaNumeroPositivo("categoria_id"),
  })
  .options({ abortEarly: false });


module.exports = schemaProdutos;
