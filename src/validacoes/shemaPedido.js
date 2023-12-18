const joi = require("joi");

const schemaPedido = joi.object({
  cliente_id: joi.number().required(),
  observacao: joi.string(),
  pedido_produtos: joi
    .array()
    .items(
      joi.object({
        produto_id: joi.number().required(),
        quantidade_produto: joi.number().required(),
      })
    )
    .required(),
});
