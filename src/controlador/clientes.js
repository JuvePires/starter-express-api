const knex = require("../banco/conexao");
const {
  verificarEmailExistente,
  verificarCpfExistente,
} = require("../validacoes/emailCPF");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf } = req.body;

  try {
    const emailExiste = await verificarEmailExistente(email);

    if (emailExiste) {
      return res.status(400).json({ mensagem: "O email já existe" });
    }

    const cpfExiste = await verificarCpfExistente(cpf);

    if (cpfExiste) {
      return res.status(400).json({ mensagem: "O cpf já existe" });
    }

    const clienteInserido = await knex("clientes")
      .returning(["id", "nome", "email", "cpf"])
      .insert({
        nome,
        email,
        cpf,
      });

    return res.status(201).json(clienteInserido[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const atualizarCliente = async (req, res) => {
  const { nome, email, cpf } = req.body;
  const cliente_id = req.params.id;

  try {
    const emailExiste = await verificarEmailExistente(email, cliente_id);

    if (emailExiste) {
      return res.status(400).json({ mensagem: "O email já existe" });
    }

    const cpfExiste = await verificarCpfExistente(cpf, cliente_id);

    if (cpfExiste) {
      return res.status(400).json({ mensagem: "O cpf já existe" });
    }

    const clienteAtualizado = await knex("clientes")
      .where("id", cliente_id)
      .update({
        nome,
        email,
        cpf,
      })
      .returning(["id", "nome", "email", "cpf"]);

    if (!clienteAtualizado || clienteAtualizado.length === 0) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    return res.status(200).json(clienteAtualizado[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  cadastrarCliente,
  atualizarCliente,
  // outros métodos...
};


const listarClientes = async (req, res) => {
  try {
    const clientes = await knex("clientes")
      .select("id", "nome", "email", "cpf")
      .orderBy("id", "asc");
    return res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalharCliente = async (req, res) => {
  const cliente_id = req.params.id;

  try {
    const cliente = await knex("clientes").where("id", cliente_id).first();

    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  cadastrarCliente,
  atualizarCliente,
  listarClientes,
  detalharCliente,
};
