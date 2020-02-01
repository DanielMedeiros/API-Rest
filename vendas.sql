-- criação do banco de dados
CREATE DATABASE vendas;

CREATE TABLE produtos (
    id_produto INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(45) NOT NULL,
    preco FLOAT NOT NULL
    
);

CREATE TABLE pedidos (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    quantidade INT NOT NULL,
    id_produto INT NOT NULL
    
);

insert into produtos(nome, preco)values('Star Wars', 20.00);
insert into produtos(nome, preco)values('Rambo V', 15.00);
insert into produtos(nome, preco)values('Avangers', 35.00);

insert into pedidos(quantidade, id_produto)values(2,1);
insert into pedidos(quantidade, id_produto)values(3,2);
insert into pedidos(quantidade, id_produto)values(5,3);





