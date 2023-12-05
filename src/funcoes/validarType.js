const validarTypes = (dados) => {
  const returno = dados.map((dado) => {
    if (dado.string && typeof dado.valor !== "string") {
      return {
        valido: false,
        mensagem: "(Não está em formato de string)",
        nome: dado.nome,
      };
    }

    if (dado.string) {
      const espacosEmBranco = dado.valor?.includes(" ");

      if (espacosEmBranco) {
        return {
          valido: false,
          mensagem: "(Não pode conter espaços)",
          nome: dado.nome,
        };
      }
    }

    if (dado.number) {
      dado.valor = Number(dado.valor);

      if (!Number.isFinite(dado.valor)) {
        return {
          valido: false,
          message: "(Não está em formato numérico)",
          nome: dado.nome,
        };
      }
    }

    return {
      valido: true,
      message: "",
      nome: "",
    };
  });

  const invalido = returno.find((r) => r.valido === false);

  if (!invalido?.valido) {
    return returno[0];
  }
};

module.exports = { validarTypes };
