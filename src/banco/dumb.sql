CREATE DATABASE pdv;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);


INSERT INTO categorias (descricao) VALUES
    ('Informática'),
    ('Celulares'),
    ('Beleza e Perfumaria'),
    ('Mercado'),
    ('Livros e Papelaria'),
    ('Brinquedos'),
    ('Moda'),
    ('Bebê'),
    ('Jogos');

 CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    imagem VARCHAR(255),
    quantidade_estoque INTEGER NOT NULL,
    valor MONEY,
    categoria_id integer not null references categorias(id),
    pedido_produto_id INTEGER[]
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    cpf VARCHAR(11) UNIQUE,
    cep VARCHAR(8),
    rua VARCHAR(255),
    numero INTEGER,
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(255)

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER,
    observacao TEXT,
    valor_total DECIMAL, 
    CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE pedidos_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER,
    produto_id INTEGER,
    quantidade_produto INTEGER,
    valor_produto DECIMAL,
    CONSTRAINT fk_pedido FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    CONSTRAINT fk_produto FOREIGN KEY (produto_id) REFERENCES produtos(id)
);
);
;


DROP TABLE IF EXISTS pedidos_produtos;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS pedidos;

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    observacao TEXT,
    valor_total DECIMAL
);

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    imagem VARCHAR(255),
    quantidade_estoque INTEGER NOT NULL,
    valor MONEY,
    categoria_id integer not null references categorias(id),
    pedido_produto_id INTEGER[]
);

CREATE TABLE pedidos_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedidos(id),
    produto_id INTEGER REFERENCES produtos(id),
    quantidade_produto INTEGER,
    valor_produto DECIMAL
);
