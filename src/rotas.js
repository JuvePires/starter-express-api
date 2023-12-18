const express = require("express");
const validarCorpoRequisicao = require("./intermediario/validarCorpoRequisicao");
const schemaUsuario = require("./validacoes/schemaUsuarios");
const schemaProdutos = require("./validacoes/schemaProdutos");
const schemaClientes = require("./validacoes/schemaClientes");
const schemaPedido = require("./validacoes/shemaPedido");
const schemaPedidos = require("./validacoes/schemaPedidos");
const multer = require("./filtros/multer");

const {
  verificarEnvioNome,
  verificarEnvioEmailSenha,
  verificarEnvioTransacaoDados,
  verificarEnvioTransacaoId,
  verificarEnvioToken,
} = require("./intermediario/enviado");

const {
  verificarExisteEmailUsuario,
  verificarExisteEmailCliente,
  verificarExisteUsuarioId,
  verificarExisteTransicaoId,
  verificarExisteCategoriaId,
} = require("./intermediario/existe");

const {
  verificarNaoEnviadoBody,
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
} = require("./intermediario/nao-enviado");

//const { validarTipo, verificarToken } = require("./intermediario/valido");

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
  atualizarImagemProduto,
  excluirImagemProduto,
} = require("./controlador/produtos");

const listarCategorias = require("./controlador/categorias");

const {
  cadastrarCliente,
  atualizarCliente,
  listarClientes,
  detalharCliente,
} = require("./controlador/clientes");

const { cadastrarPedido, listarPedidos } = require("./controlador/pedidos");

const verificarUsuarioLogado = require("./intermediario/verificaLogin");

const rotas = express();

rotas.post(
  "/usuario",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  verificarExisteEmailUsuario,
  validarCorpoRequisicao(schemaUsuario),
  cadastrarUsuario
);
rotas.post(
  "/login",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  verificarEnvioEmailSenha,
  verificarExisteEmailUsuario,
  validarCorpoRequisicao(schemaUsuario),
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
  verificarExisteEmailUsuario,
  validarCorpoRequisicao(schemaUsuario),
  atualizarUsuario
);
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
rotas.post(
  "/produto",
  multer.single('imagem'),
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  validarCorpoRequisicao(schemaProdutos),
  cadastrarProduto
);

rotas.delete("/produtos/:id/imagem", excluirImagemProduto);
rotas.patch(
  "/produtos/:id/imagem",
  multer.single("imagem"),
  atualizarImagemProduto
);

rotas.put(
  "/produto/:id",
  verificarNaoEnviadoQuery,
  validarCorpoRequisicao(schemaProdutos),
  atualizarProduto
);

rotas.get("/produto/:id", verificarNaoEnviadoBody, detalharProduto);

rotas.get("/produto/", verificarNaoEnviadoBody, listarProdutos);

rotas.delete("/produto/:id", verificarNaoEnviadoBody, excluirProduto);

rotas.post(
  "/cliente",
  verificarNaoEnviadoParams,
  verificarNaoEnviadoQuery,
  verificarExisteEmailCliente,
  validarCorpoRequisicao(schemaClientes),
  cadastrarCliente
);

rotas.put(
  "/cliente/:id",
  verificarNaoEnviadoQuery,
  verificarExisteEmailCliente,
  validarCorpoRequisicao(schemaClientes),
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

//console.log(schemaPedido)
rotas.post("/pedido", validarCorpoRequisicao(schemaPedidos), cadastrarPedido);
rotas.get("/pedido", verificarNaoEnviadoBody, listarPedidos)

/* rotas.get("/",);
rotas.put("/",);
rotas.del("/",);
rotas.post("/",); */

module.exports = rotas;
