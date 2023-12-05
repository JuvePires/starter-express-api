const knex = require("../banco/conexao");

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    if (!descricao) {
      return res
        .status(404)
        .json({ mensagem: "A descrição deve ser informada." });
    }
    if (!quantidade_estoque) {
      return res
        .status(404)
        .json({ mensagem: "A quantidade deve ser informada." });
    }
    if (!valor) {
      return res.status(404).json({ mensagem: "O valor deve ser informado." });
    }
    if (!categoria_id) {
      return res
        .status(404)
        .json({ mensagem: "A categoria deve ser informado." });
    }
    console.log(categoria_id);
    const categoria = await knex("categorias")
      .where("id", categoria_id)
      .first();
    console.log(categoria);
    if (!categoria) {
      return res
        .status(404)
        .json({ mensagem: "A categoria informada não existe." });
    }

    const produtoInserido = await knex("produtos")
      .returning(["descricao", "quantidade_estoque", "valor", "categoria_id"])
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      });

    return res.status(201).json(produtoInserido[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const atualizarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const produto_id = req.params.id;
  try {
    if (!descricao) {
      return res
        .status(404)
        .json({ mensagem: "A descrição deve ser informada." });
    }
    if (!quantidade_estoque) {
      return res
        .status(404)
        .json({ mensagem: "A quantidade deve ser informada." });
    }
    if (!valor) {
      return res.status(404).json({ mensagem: "O valor deve ser informado." });
    }
    const produto = await knex("produtos").where("id", produto_id).first();
    if (!produto) {
      return res
        .status(404)
        .json({ mensagem: "O produto informado não existe." });
    }
    const categoria = await knex("categorias")
      .where("id", categoria_id)
      .first();
    if (!categoria) {
      return res
        .status(404)
        .json({ mensagem: "A categoria informada não existe." });
    }
    await knex("produtos").where("id", produto_id).update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
const listarProdutos = async (req, res) => {
  const { categoria_id } = req.body;
  try {
    if (categoria_id) {
      const categoriaIdTabela = await knex("categorias")
        .where("id", categoria_id)
        .first();

      if (!categoriaIdTabela) {
        return res
          .status(404)
          .json({ mensagem: "A categoria informada não existe." });
      }

      const produtos = await knex
        .select()
        .from("produtos")
        .where("categoria_id", categoria_id);

      return res.status(200).json(produtos);
    } else {
      const produtos = await knex.select().from("produtos");

      return res.status(200).json(produtos);
    }
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalharProduto = async (req, res) => {
  const produto_id = req.params.id;
  console.log(req.params.id);
  try {
    const produto = await knex("produtos").where("id", produto_id).first();

    if (!produto) {
      return res
        .status(404)
        .json({ mensagem: "O produto informado não existe." });
    }

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
const excluirProduto = async (req, res) => {
  const produto_id = req.params.id;

  try {
    const produto = await knex("produtos").where("id", produto_id).first();

    if (!produto) {
      return res
        .status(404)
        .json({ mensagem: "O produto informado não existe." });
    }

    await knex("produtos").where("id", produto_id).del();

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  cadastrarProduto,
  atualizarProduto,
  listarProdutos,
  detalharProduto,
  excluirProduto,
};
