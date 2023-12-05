const pool = require("../banco/conexao");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../senhaJwt");

const validarTipo = (req, res, next) => {
  try {
    const { tipo } = req.body;

    if (tipo !== "entrada" && tipo !== "saida") {
      return res.status(400).json({
        mensagem: "O tipo informado é inválido! (Não é entrada ou saída)",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: "Erro ao validar tipo!" });
  }
};

const verificarToken = async (req, res, next) => {
  const token = req.token;

  try {
    const { id } = jwt.verify(token, senhaJwt);
    const { rows, rowCount } = await pool.query(
      "select * from usuarios where id = $1",
      [id]
    );

    if (rowCount === 0) {
      return res.status(401).json({ mensagem: "Não autorizado!" });
    }

    const { senha, ...usuario } = rows[0];

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Não autorizado!" });
  }
};

module.exports = {
  validarTipo,
  verificarToken,
};
