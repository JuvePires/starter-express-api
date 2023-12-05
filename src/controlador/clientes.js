const knex = require("../banco/conexao");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf } = req.body;

  console.log("Nome:", nome);
  console.log("Email:", email);
  console.log("CPF:", cpf);

  if (!cpf) {
    return res.status(404).json("O campo CPF é obrigatório");
  }

  try {
    const emailExiste = await knex("clientes").where({ email }).first();

    if (emailExiste) {
      return res.status(400).json("O email já existe");
    }

    const cpfExiste = await knex("clientes").where({ cpf }).first();

    if (cpfExiste) {
      return res.status(400).json("O cpf já existe");
    }

    const clienteInserido = await knex("clientes")
      .returning(["nome", "email", "cpf"])
      .insert({
        nome,
        email,
        cpf,
      });

    return res.status(201).json(clienteInserido[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
const atualizarCliente = async (req, res) => {
  const { nome, email, cpf } = req.body;
  const cliente_id = req.params.id;

  if (!nome || !email || !cpf) {
    return res.status(400).json("Os campos nome, email e cpf são obrigatórios");
  }

  try {
    const emailExiste = await knex("clientes")
      .where({ email })
      .whereNot("id", cliente_id)
      .first();

    if (emailExiste) {
      return res.status(400).json("O email já existe");
    }

    const cpfExiste = await knex("clientes")
      .where({ cpf })
      .whereNot("id", cliente_id)
      .first();

    if (cpfExiste) {
      return res.status(400).json("O cpf já existe");
    }

    const clienteAtualizado = await knex("clientes")
      .where("id", cliente_id)
      .update({
        nome,
        email,
        cpf,
      });

    if (!clienteAtualizado) {
      return res.status(404).json("Cliente não encontrado");
    }

    return res.status(200).json("Cliente foi atualizado com sucesso.");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
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
