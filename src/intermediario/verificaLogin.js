const jwt = require("jsonwebtoken");
const knex = require("../banco/conexao");
const senhaJwt = require("../senhaJwt");

const verificarUsuarioLogado = async (req, res, next) => {
  
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ mensagem: "Deve haver método de autenticação Bearer token" });
  }

  if (authorization.split(" ")[1] === undefined) {
    return res.status(401).json({ mensagem: "Favor informar o token" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, senhaJwt);
    const usuario = await knex("usuarios").where("id", id).first();

    if (!usuario) {
      return res.status(401).json({ mensagem: "Não autorizado" });
    }

    req.usuario = id;
    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }
};

module.exports = verificarUsuarioLogado;