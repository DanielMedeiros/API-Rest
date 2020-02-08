-- criação do banco de dados
CREATE DATABASE vendas;

-- CREATE TABLE produtos (
--     id_produto INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
--     nome VARCHAR(45) NOT NULL,
--     preco FLOAT NOT NULL
--     
-- );

-- CREATE TABLE pedidos (
--     id_pedido INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
--     quantidade INT NOT NULL,
--     id_produto INT NOT NULL
--     
-- );

show tables;

desc pedidos;

select * from pedidos;

desc produtos;

select * from produtos;

select * from usuarios;


-- TRUNCATE TABLE usuarios;

-- Adicionando coluna para imagem
-- ALTER TABLE produtos ADD COLUMN imagem_produto VARCHAR(500);

-- ALTER TABLE usuarios ADD UNIQUE (email);
-- ALTER TABLE usuarios MODIFY COLUMN email VARCHAR(100) NOT NULL;
-- ALTER TABLE usuarios MODIFY COLUMN senha VARCHAR(100) NOT NULL;

desc usuarios;


-- Adicionando tabela usuario

-- CREATE TABLE usuarios(
-- 	id_usuario INTEGER NOT NULL  PRIMARY KEY AUTO_INCREMENT,
--     email VARCHAR(100),
--     senha VARCHAR(100)
-- );

select * from usuarios;

select
 pedidos.id_pedido,
 pedidos.quantidade,
 produtos.id_produto,
 produtos.nome,
 produtos.preco
from pedidos
inner join produtos
on produtos.id_produto = pedidos.id_produto where pedidos.id_produto = 4;



-- insert into produtos(nome, preco)values('Star Wars', 20.00);
-- insert into produtos(nome, preco)values('Rambo V', 15.00);
-- insert into produtos(nome, preco)values('Avangers', 35.00);

-- insert into pedidos(quantidade, id_produto)values(2,1);
-- insert into pedidos(quantidade, id_produto)values(3,2);
-- insert into pedidos(quantidade, id_produto)values(5,3);










