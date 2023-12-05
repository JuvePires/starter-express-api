const express = require("express");

const {
  verificarEnvioNome,
  verificarEnvioEmailSenha,
  verificarEnvioTransacaoDados,
  verificarEnvioTransacaoId,
  verificarEnvioToken,
} = require("./intermediario/enviado");

const {
  verificarExisteEmail,
  verificarExisteUsuarioId,
  verificarExisteTransicaoId,
  verificarExisteCategoriaId,
} = require("./intermediario/existe");

const {
  verificarNaoEnviadoBody,
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
} = require("./intermediario/nao-enviado");

const { validarTipo, verificarToken } = require("./intermediario/valido");

const {
  cadastrarUsuario,
  login,
  infoUsuario,
  atualizarUsuario,
} = require("./controlador/usuarios");

const {
  cadastrarProduto,
  atualizarProduto,
  listarProdutos,
  detalharProduto,
  excluirProduto,
} = require("./controlador/produtos");

const listarCategorias = require("./controlador/categorias");

const {
  cadastrarCliente,
  atualizarCliente,
  listarClientes,
  detalharCliente,
} = require("./controlador/clientes");

const verificarUsuarioLogado = require("./intermediario/verificaLogin");

const rotas = express();

rotas.post(
  "/usuario",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  verificarEnvioNome,
  verificarEnvioEmailSenha,
  verificarExisteEmail,
  cadastrarUsuario
);
rotas.post(
  "/login",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  verificarEnvioEmailSenha,
  verificarExisteEmail,
  login
);
rotas.get("/categoria", listarCategorias);

rotas.use(verificarUsuarioLogado);

rotas.get(
  "/usuario",
  verificarNaoEnviadoBody,
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  infoUsuario
);
rotas.put(
  "/usuario",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  verificarEnvioNome,
  verificarEnvioEmailSenha,
  verificarExisteEmail,
  atualizarUsuario
);
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
rotas.post(
  "/produto",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,

  cadastrarProduto
);

rotas.put(
  "/produto/:id",
  verificarNaoEnviadoQuery,
  atualizarProduto
);

rotas.get(
  "/produto/:id",
  verificarNaoEnviadoBody,
  verificarNaoEnviadoQuery,
  detalharProduto
);

rotas.get(
  "/produto",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  listarProdutos
);

rotas.delete("produto/:id", excluirProduto);

rotas.post(
  "/cliente",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  verificarEnvioNome,
  verificarExisteEmail,
  cadastrarCliente
);

rotas.put(
  "/cliente/:id",
  verificarNaoEnviadoQuery,
  verificarEnvioNome,
  atualizarCliente
);

rotas.get(
  "/cliente",
  verificarNaoEnviadoBody,
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  listarClientes
);

rotas.get(
  "/cliente/:id",
  verificarNaoEnviadoBody,
  verificarNaoEnviadoQuery,
  detalharCliente
);

/* rotas.get("/",);
rotas.put("/",);
rotas.del("/",);
rotas.post("/",); */

module.exports = rotas;
