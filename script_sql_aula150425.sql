-- Criando DATABASE
CREATE DATABASE IF NOT EXISTS exemplo_db;

-- Após criar a DATABASE, é necessário usar ela (USE)
USE exemplo_db;

-- Criando tabela clientes
CREATE TABLE clientes(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(100) NOT NULL,
email VARCHAR(50) NOT NULL,
telefone VARCHAR(200) NOT NULL,
cidade VARCHAR(100) NOT NULL
);

-- Criando tabela produtos
CREATE TABLE produtos(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(100) NOT NULL,
categoria VARCHAR(50) NOT NULL,
preco DECIMAL(10,2) NOT NULL
);

-- Criando tabela pedidos
CREATE TABLE pedidos(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
cliente_id INT,
data_pedido DATE NOT NULL,
valor DECIMAL(10,2) NOT NULL,
FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Inserindo valores na tabela clientes
INSERT INTO clientes(nome, email, telefone, cidade)
VALUES
("Carro", "carro@vroomvroom.com.br", "21912345678", "Maricá"),
("Moto", "moto@vroomvroom.com.br", "21987654321", "Niterói"),
("Caminhão", "caminhao@vroomvroom.com.br", "21976543210", "Itaboraí");

-- Inserindo valores na tabela produtos
INSERT INTO produtos(nome, categoria, preco)
VALUES
("Óleo para motor", "Mecânica", 129.99),
("Lâmpada para farol", "Mecânica", 79.99),
("Mini monitor", "Eletrônica", 369.99);

-- Inserindo valores na tabela pedidos
INSERT INTO pedidos(cliente_id, data_pedido, valor)
VALUES
(1, "2025-02-12", 159.98),
(2, "2025-02-12", 369.99),
(3, "2025-02-12", 129.99);

-- A função UPDATE
-- O que temos atualmente
SELECT * FROM clientes;

-- Utilizando UPDATE para apagar colunas em baseado em uma condição
UPDATE clientes
SET nome = "Roberto Carros"
WHERE id = 1; -- Essa é a condição.

-- Apagando colunas de tabelas
-- Inserido exemplo para ser apagar
INSERT INTO clientes(nome, email, telefone, cidade)
VALUES
("Me Apague", "apagueme@exemplo.com.br", "21912345678", "Apaguelândia");

-- Apagar cliente com condição especificada
DELETE FROM clientes 
WHERE id = 4; -- WHERE é a condição

-- Selecionar contagem de clientes
SELECT COUNT(*) AS "Qnt. de clientes" FROM clientes;

-- Manipulando pedidos
-- Mostrar pedidos
SELECT * FROM pedidos; 

-- Somar valor de todos os pedidos
SELECT SUM(valor) AS "Total em pedidos" FROM pedidos;

-- Soma de valores acima do especificado
SELECT SUM(valor) AS "Total em pedidos" FROM pedidos
WHERE valor > 130;

-- Selecionado média do valor dos pedidos
SELECT AVG(valor) AS "Média dos pedidos" FROM pedidos;

-- Selecionando maior valor dos pedidos
SELECT MAX(valor) from pedidos;

-- Selecionando menor valor dos pedidos
SELECT MIN(valor) from pedidos;

-- Utilizando LIKE
-- % no começo = termina com
SELECT * FROM clientes 
WHERE nome LIKE "%o";

-- % no final = começa com
SELECT * FROM clientes 
WHERE nome LIKE "c%";

-- Selecionado contagem de produtos com categorias
SELECT categoria AS "Nome da categoria", COUNT(*) AS "Contagem"
FROM produtos
GROUP BY categoria;

-- Utilizando HAVING - HAVING filtra os grupos criados com o GROUP BY
-- Você pode utilizá-lo para filtrar categorias baseado em condições
-- Nesse caso, a condição definida aqui são categorias com uma média de preço maior que 200
SELECT categoria, AVG(preco)
FROM produtos
GROUP BY categoria
HAVING AVG(preco) > 200;

-- Utilizando o INNER JOIN
-- Vendo o que atualmente temos em clientes e pedidos
SELECT * FROM clientes;
SELECT * FROM pedidos;

-- Unindo as tabelas acima
SELECT clientes.nome, pedidos.valor --
FROM clientes
INNER JOIN pedidos ON clientes.id = pedidos.cliente_id;

-- Nota do professor: "INNER JOIN retorna apenas os registros que têm correspondência
-- em AMBAS as tabelas."
-- Isso pode parecer confuso, mas o que está acontecendo é:
-- pedidos 

-- Utilizando o LEFT JOIN
-- Vendo o que atualmente temos em clientes e pedidos
SELECT * FROM clientes;
SELECT * FROM pedidos;

-- Unindo as tabelas acima. Note que clientes e pedidos foram invertidos
SELECT clientes.nome, pedidos.valor --
FROM clientes
LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id;

-- Nota do professor: "RETORNA TODOS OS REGISTROS DA TABELA DA ESQUERDA
-- E OS REGISTROS CORRESPONDENTES DA TABELA DA DIREITA
-- SE NÃO HOUVER CORRESPONDÊNCIA, OS RESULTADOS SERÃO NULL"

-- Utilizando o RIGHT JOIN
-- Vendo o que atualmente temos em clientes e pedidos
SELECT * FROM clientes;
SELECT * FROM pedidos;

-- Unindo as tabelas acima. Note que clientes e pedidos foram invertidos
SELECT clientes.nome, pedidos.valor --
FROM clientes
RIGHT JOIN pedidos ON clientes.id = pedidos.cliente_id;

-- Bônus: ALIAS
-- Você pode colocar um "ALIAS" ao lado do nome inteiro da tabela.
SELECT c.nome, p.valor --
FROM clientes c
RIGHT JOIN pedidos p ON clientes.id = pedidos.cliente_id;


-- O que será pedido, exatamente em ordem: 
-- CREATE TABLE 
-- USE 
-- CREATE DATABASE
-- DROP TABLE
-- DROP DATABASE
-- SELECT, WHERE, FUNÇÕES (?)

-- DELETE
-- LIMIT
-- BETWEEN
-- IN
-- LIKE
-- ALIAS
-- GROUP BY
-- ALTER TABLE (MODIFY, ADD, REMOVE)
-- INNER JOIN
-- LEFT JOIN
-- RIGHT JOIN
