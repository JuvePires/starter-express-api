const Joi = require("joi");

const criarMensagem = (campo, id_produto) => ({
  "number.positive": `O campo ${campo} do produto ${id_produto} precisa ser um número positivo`,
  "number.base": `O campo ${campo} do produto ${id_produto} precisa ser um número`,
  "any.required": `O campo ${campo} do produto ${id_produto} é obrigatório`,
  "number.empty": `O campo ${campo} do produto ${id_produto} é obrigatório`,
});

const criarEsquemaNumeroPositivo = (campo, id_produto) =>
  Joi.number().positive().required().messages(criarMensagem(campo, id_produto));

const schemaPedidos = Joi.object({
  cliente_id: criarEsquemaNumeroPositivo("cliente_id"),
  observacao: Joi.string().required().messages({
    "any.required": "O campo observacao é obrigatório",
    "string.empty": "O campo observacao é obrigatório",
  }),
  pedido_produtos: Joi.array()
    .items(
      Joi.object({
        produto_id: criarEsquemaNumeroPositivo("produto_id"),
        quantidade_produto: criarEsquemaNumeroPositivo("quantidade_produto"),
      })
    )
    .required(),
});

module.exports = schemaPedidos;
