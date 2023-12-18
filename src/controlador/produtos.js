const knex = require("../banco/conexao");
const { uploadImagem, excluirImagem } = require("../servicos/uploads");

const verificarCategoriaExistente = async (categoriaId) => {
  const categoria = await knex("categorias").where("id", categoriaId).first();
  return categoria;
};

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const categoria = await verificarCategoriaExistente(categoria_id);

    if (!categoria) {
      return res
        .status(404)
        .json({ mensagem: "A categoria informada não existe." });
    }

    const produtoExistente = await knex("produtos")
      .where("descricao", descricao)
      .first();

    if (produtoExistente) {
      await knex("produtos")
        .where("id", produtoExistente.id)
        .update({
          quantidade_estoque:
            produtoExistente.quantidade_estoque + quantidade_estoque,
        });

      return res
        .status(200)
        .json({ mensagem: "Quantidade do produto atualizada com sucesso." });
    } else {
      let imagemPath;

      if (req.file) {
        const { originalname, mimetype, buffer } = req.file;
        const id = produtoInserido.id;

        const imagem = await uploadImagem(
          `produtos/${id}/${originalname}`,
          buffer,
          mimetype
        );

        imagemPath = imagem.path;
      }

      const [produtoInserido] = await knex("produtos")
        .returning([
          "id",
          "descricao",
          "quantidade_estoque",
          "valor",
          "categoria_id",
        ])
        .insert({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
          imagem: imagemPath,
        });

      return res.status(201).json(produtoInserido);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};


const atualizarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const produto_id = req.params.id;

  try {
    const produto = await knex("produtos").where("id", produto_id).first();

    if (!produto) {
      return res
        .status(404)
        .json({ mensagem: "O produto informado não existe." });
    }

    const categoria = await verificarCategoriaExistente(categoria_id);

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

    const produtoAtualizado = await knex("produtos")
      .where("id", produto_id)
      .first();

    return res.status(200).json(produtoAtualizado);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listarProdutos = async (req, res) => {
  const { categoria_id } = req.query;
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
    const produtoVinculadoPedido = await knex("pedidos_produtos")
      .where("produto_id", produto_id)
      .first();

    if (produtoVinculadoPedido) {
      return res.status(400).json({
        mensagem:
          "Não é possível excluir o produto, pois está vinculado a um ou mais pedidos.",
      });
    }

    const produto = await knex("produtos").where("id", produto_id).first();

    if (!produto) {
      return res
        .status(404)
        .json({ mensagem: "O produto informado não existe." });
    }

    await knex("produtos").where("id", produto_id).del();

    return res.status(204).json();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
const atualizarImagemProduto = async (req, res) => {
  const { originalname, mimetype, buffer } = req.file;
  const { id } = req.params;

  try {
    const produtoEncontrado = await knex("produtos")
      .where({
        id,
        usuario_id: req.usuario.id,
      })
      .first();

    if (!produtoEncontrado) {
      return res.status(404).json("Produto não encontrado");
    }

    await excluirImagem(produtoEncontrado.imagem);

    const upload = await uploadImagem(
      `produtos/${produtoEncontrado.id}/${originalname}`,
      buffer,
      mimetype
    );

    const produto = await knex("produtos").where({ id }).update({
      imagem: upload.path,
    });

    if (!produto) {
      return res.status(400).json("O produto não foi atualizado");
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const excluirImagemProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produtoEncontrado = await knex("produtos")
      .where({
        id,
        usuario_id: req.usuario.id,
      })
      .first();

    if (!produtoEncontrado) {
      return res.status(404).json("Produto não encontrado");
    }

    await excluirImagem(produtoEncontrado.imagem);

    const produto = await knex("produtos").where({ id }).update({
      imagem: null,
    });

    if (!produto) {
      return res.status(400).json("O produto não foi atualizado");
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarProduto,
  atualizarProduto,
  listarProdutos,
  detalharProduto,
  excluirProduto,
  atualizarImagemProduto,
  excluirImagemProduto
};
