const verificarNaoEnviadoBody = (req, res, next) => {
  try {
    const { body } = req;

    if (Object.keys(body).length > 0) {
      return res.status(400).json({
        mensagem: "Não é permitido enviar body na requisição!",
      });
    }

    next();
  } catch {
    res.status(400).json({ mensagem: "Erro ao validar body!" });
  }
};

const verificarNaoEnviadoParams = (req, res, next) => {
  try {
    const { params } = req;

    if (Object.keys(params).length > 0) {
      return res.status(400).json({
        mensagem: "Não é permitido enviar params na requisição!",
      });
    }

    next();
  } catch {
    res.status(400).json({ mensagem: "Erro ao validar params!" });
  }
};

const verificarNaoEnviadoQuery = (req, res, next) => {
  try {
    const { query } = req;

    if (Object.keys(query).length > 0) {
      return res.status(400).json({
        mensagem: "Não é permitido enviar query na requisição!",
      });
    }

    next();
  } catch {
    res.status(400).json({ mensagem: "Erro ao validar query!" });
  }
};

module.exports = {
  verificarNaoEnviadoBody,
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
};
