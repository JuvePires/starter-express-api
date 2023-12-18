const bcrypt = require("bcrypt");
const knex = require("../banco/conexao");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../senhaJwt");

const verificarUsuarioExistente = async (email) => {
  const usuario = await knex("usuarios").where("email", email).first();
  return usuario;
};

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const usuarioExiste = await verificarUsuarioExistente(email);

  if (usuarioExiste) {
    return res.status(400).json({ mensagem: "Email já existe!" });
  }

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioInserido = await knex("usuarios")
      .returning(["id", "nome", "email"])
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
      });

    return res.status(201).json(usuarioInserido[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await knex("usuarios").where("email", email).first();

    if (!usuario) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const verificarSenha = await bcrypt.compare(senha, usuario.senha);

    if (!verificarSenha) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const { senha: _, ...usuarioLogado } = usuario;

    const token = jwt.sign({ id: usuarioLogado.id }, senhaJwt, {
      expiresIn: "8h",
    });

    return res.status(200).json({ usuario: usuarioLogado, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const infoUsuario = async (req, res) => {
  const id = req.usuario;
  console.log(id);
  try {
    const usuario = await knex("usuarios").where("id", id).first();

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const usuario_id = req.usuario;
  const usuarioExiste = await verificarUsuarioExistente(email);

  if (usuarioExiste) {
    return res.status(400).json({ mensagem: "Email já existe!" });
  }

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await knex("usuarios").where("id", usuario_id).update({
      nome,
      email,
      senha: senhaCriptografada,
    });

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  cadastrarUsuario,
  login,
  infoUsuario,
  atualizarUsuario,
};
