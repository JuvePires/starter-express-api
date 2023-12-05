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
    quantidade_estoque INTEGER NOT NULL,
    valor MONEY,
    categoria_id integer not null references categorias(id)
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
);
