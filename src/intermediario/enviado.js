const { validarTypes } = require("../funcoes/validarType");

const verificarEnvioNome = (req, res, next) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({
        mensagem: "É necessário informar o nome do usuário!",
      });
    }

    if (typeof nome !== "string") {
      return res.status(400).json({
        message:
          "O nome do usuário informado é inválido! (Não está em formato de string)",
      });
    }

    next();
  } catch {
    return res.status(400).json({ mensagem: "Erro ao validar nome!" });
  }
};

const verificarEnvioEmailSenha = (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        mensagem: "É necessário informar o email e a senha do usuário!",
      });
    }

    const dados = [
      {
        nome: "email",
        string: true,
        number: false,
        valor: email,
      },
      {
        nome: "senha",
        string: true,
        number: false,
        valor: senha,
      },
    ];

    const { valido, mensagem } = validarTypes(dados);

    if (!valido) {
      return res.status(400).json({
        mensagem: `O email ou senha informado é inválido! ${mensagem}`,
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: "Erro ao validar email e senha!" });
  }
};

const verificarEnvioTransacaoDados = (req, res, next) => {
  try {
    const { tipo, descricao, valor, data, categoria_id } = req.body;

    if (!tipo || !descricao || !valor || !data || !categoria_id) {
      return res.status(400).json({
        mensagem: "É necessário informar todos os dados da transação!",
      });
    }

    if (typeof valor !== "number" || typeof categoria_id !== "number") {
      return res.status(400).json({
        mensagem:
          "O valor ou a categoria_id informado é inválido! (Não está em formato numérico)",
      });
    }

    const dados = [
      {
        nome: "tipo",
        string: true,
        number: false,
        valor: tipo,
      },
      {
        nome: "decricao",
        string: true,
        number: false,
        valor: descricao,
      },
      {
        nome: "valor",
        string: false,
        number: true,
        valor: valor,
      },
      {
        nome: "data",
        string: true,
        number: false,
        valor: data,
      },
      {
        nome: "categoria_id",
        string: false,
        number: true,
        valor: categoria_id,
      },
    ];

    const { valido, mensagem, nome } = validarTypes(dados);

    if (!valido) {
      return res.status(400).json({
        mensagem: `O(A) ${nome} informado(a) é inválido(a)! ${mensagem}`,
      });
    }

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ mensagem: "Erro ao validar dados da transação!" });
  }
};

const verificarEnvioTransacaoId = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        mensagem: "É necessário informar o id da transação!",
      });
    }

    const dados = [
      {
        nome: "id",
        string: false,
        number: true,
        valor: id,
      },
    ];

    const { valido, mensagem } = validarTypes(dados);

    if (!valido) {
      return res.status(400).json({
        mensagem: `O id informado é inválido! ${mensagem}`,
      });
    }

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ mensagem: "Erro ao validar id da transação!" });
  }
};

const verificarEnvioToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        mensagem: "É necessário informar o token!",
      });
    }

    const dados = [
      {
        nome: "token",
        string: true,
        number: false,
        valor: token,
      },
    ];

    const { valido, mensagem } = validarTypes(dados);

    if (!valido) {
      return res.status(400).json({
        mensagem: `O token informado é inválido! ${mensagem}`,
      });
    }

    req.token = token;

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: "Erro ao validar token!" });
  }
};

module.exports = {
  verificarEnvioNome,
  verificarEnvioEmailSenha,
  verificarEnvioTransacaoDados,
  verificarEnvioTransacaoId,
  verificarEnvioToken,
};
