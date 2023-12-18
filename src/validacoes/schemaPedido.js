const Joi = require("joi");

const criarMensagem = (campo) => ({
  "number.positive": `O campo ${campo} precisa ser um número positivo`,
  "number.base": `O campo ${campo} precisa ser um número`,
  "any.required": `O campo ${campo} é obrigatório`,
  "number.empty": `O campo ${campo} é obrigatório`,
});

const criarEsquemaNumeroPositivo = (campo) =>
  joi.number().positive().required().messages(criarMensagem(campo));

const schemaPedido = Joi.object({
  cliente_id: Joi.number().required(),
  observacao: Joi.string().required(),
  pedido_produtos: Joi.array()
    .items(
      Joi.object({
        produto_id: Joi.number().required(),
        quantidade_produto: Joi.number().required(),
      })
    )
    .required(),
});

module.exports = schemaPedido;
