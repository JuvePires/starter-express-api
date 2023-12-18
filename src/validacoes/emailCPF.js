const knex = require("../banco/conexao");

const verificarEmailExistente = async (email, id = null) => {
  const query = knex("clientes").where({ email });
  if (id) {
    query.whereNot("id", id);
  }
  const cliente = await query.first();
  return cliente;
};

const verificarCpfExistente = async (cpf, id = null) => {
  const query = knex("clientes").where({ cpf });
  if (id) {
    query.whereNot("id", id);
  }
  const cliente = await query.first();
  return cliente;
};

module.exports = {
  verificarEmailExistente,
  verificarCpfExistente,
};
