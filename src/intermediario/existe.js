const knex = require("../banco/conexao");

const verificarExisteEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const usuario = await knex("usuarios").where("email", email).first();

    req.usuarioExiste = usuario;

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: "Erro ao validar email!" });
  }
};

const verificarExisteUsuarioId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuario = await knex("usuarios").where("id", id).first();

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: "Erro ao validar id do usuário!" });
  }
};

const verificarExisteTransicaoId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const transacao = await knex("transacoes").where("id", id).first();

    if (!transacao) {
      return res.status(400).json({
        mensagem: "A transação informada não existe!",
      });
    }

    req.transacao = transacao;

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ mensagem: "Erro ao validar id da transação!" });
  }
};

const verificarExisteCategoriaId = async (req, res, next) => {
  try {
    const { categoria_id } = req.body;

    const categoria = await knex("categorias")
      .where("id", categoria_id)
      .first();

    if (!categoria) {
      return res.status(400).json({
        mensagem: "A categoria informada não existe!",
      });
    }

    req.categoria = categoria;

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ mensagem: "Erro ao validar id da categoria!" });
  }
};

module.exports = {
  verificarExisteEmail,
  // verificarExisteUsuarioId,
  verificarExisteTransicaoId,
  verificarExisteCategoriaId,
};
