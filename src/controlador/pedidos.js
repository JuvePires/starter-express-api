const knex = require("../banco/conexao");
const transportador = require("../email");
const compiladorHtml = require("../utils/compiladorHtml");

const usuario = {
  nome: "Guido Cubos",
  email: "carlos12rib@gmail.com",
  senha: "123abc",
};

const cadastrarPedido = async (req, res) => {
  const { cliente_id, pedido_produtos, observacao } = req.body;

  try {
    const cliente = await knex("clientes").where("id", cliente_id).first();
    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    let valorTotalPedido = 0;

    const valorTotalInicial = "0".replace(/[^\d.-]/g, "");

    const [pedidoId] = await knex("pedidos")
      .returning("id")
      .insert({ cliente_id, observacao, valor_total: valorTotalInicial });

    for (const pedidoProduto of pedido_produtos) {
      const { produto_id, quantidade_produto } = pedidoProduto;

      const produto = await knex("produtos").where("id", produto_id).first();

      if (!produto) {
        return res
          .status(404)
          .json({ mensagem: `Produto ${produto_id} não encontrado` });
      }

      if (produto.quantidade_estoque < quantidade_produto) {
        return res.status(400).json({
          mensagem: `Quantidade em estoque insuficiente para o produto ${produto_id}`,
        });
      }

      await knex("produtos")
        .where("id", produto_id)
        .update({
          quantidade_estoque: produto.quantidade_estoque - quantidade_produto,
        });

      const valorProduto = parseFloat(produto.valor.replace(/[^\d.-]/g, ""));

      valorTotalPedido += valorProduto * quantidade_produto;

      await knex("pedidos_produtos").insert({
        pedido_id: pedidoId.id,
        produto_id: produto_id,
        quantidade_produto: quantidade_produto,
        valor_produto: valorProduto.toFixed(2),
      });
    }

    await knex("pedidos")
      .where("id", pedidoId.id)
      .update({ valor_total: valorTotalPedido.toFixed(2) });

    const html = await compiladorHtml("./src/templates/login.html", {
      idpedido: pedidoId.id,
    });

    transportador.sendMail({
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
      to: `${usuario.nome} <${usuario.email}>`,
      subject: "Produto cadastrado",
      html,
    });

    return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listarPedidos =  async (req, res) => {
  const { cliente_id } = req.query;

  try {
    let query = knex
      .select("pedidos.id", "pedidos.observacao", "pedidos.cliente_id")
      .from("pedidos");

    if (cliente_id) {
      const cliente = await knex("clientes").where("id", cliente_id).first();

      if (!cliente) {
        return res.status(404).json({ mensagem: "Cliente não encontrado" });
      }

      query = query.where("pedidos.cliente_id", cliente_id);
    }

    const pedidos = await query;

    const pedidosComProdutos = await Promise.all(
      pedidos.map(async (pedido) => {
        const pedidoProdutos = await knex("pedidos_produtos")
          .select(
            "pedidos_produtos.id",
            "pedidos_produtos.quantidade_produto",
            "pedidos_produtos.valor_produto",
            "pedidos_produtos.pedido_id",
            "pedidos_produtos.produto_id"
          )
          .where("pedidos_produtos.pedido_id", pedido.id);

        return { pedido, pedido_produtos: pedidoProdutos };
      })
    );

    return res.status(200).json(pedidosComProdutos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  cadastrarPedido,
  listarPedidos,
};
