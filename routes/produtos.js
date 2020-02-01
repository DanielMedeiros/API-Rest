const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    // res.status(200).send({
    //     mensagem: 'Retorna todos os produtos'
    // });

    mysql.getConnection((error, conn) => { 
        if(error) {return res.status(500).send({ error: error})}

        conn.query(
            'SELECT * FROM produtos;',
            (error, result, fields) => {
                if(error) {return res.status(500).send({ error: error})}
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod =>{
                        return {
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            resquest:{
                                tipo: 'GET',
                                descricao: 'Retorna os detelhes de um produto.',
                                url: 'http://localhost:3000/produtos/'+prod.id_produto
                            }
                        }
                    })
                }
                //return res.status(200).send({response: resultado})
                return res.status(200).send({response})
            }
        )
    })

});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    // const produto = {
    //     nome: req.body.nome,
    //     preco: req.body.preco
    // };
    

    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error})}
        conn.query(
            'INSERT INTO produtos (nome,preco)VALUES(?,?)',
            [req.body.nome, req.body.preco],
            (error, result, fields) => {
                conn.release();
                if(error) {return res.status(500).send({ error: error})}
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado: {
                        id_produto: result.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        resquest:{
                            tipo: 'POST',
                            descricao: 'Insere um produto.',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }
                // if(error){                    
                //     return res.status(500).send({
                //         error: error,
                //         response: null
                //     });                    
                // }

                // res.status(201).send({
                //         mensagem: 'Produto inserido com sucesso!',                        
                //         id_produto: result.insertId
                // })
                return res.status(201).send({response});
            }
        )
    })
    
    // res.status(201).send({
    //     mensagem: 'Insere um produto',
    //     produtoCriado: produto
    // })
});

// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req, res, next)=> {
    const id = req.params.id_produto

    mysql.getConnection((error, conn) => { 
        if(error) {return res.status(500).send({ error: error})}

        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [id],
            (error, result, fields) => {
                if(error) {return res.status(500).send({ error: error})}

                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'Não foi encontrdo produto com esse ID.'
                    })
                }

                const response = {                    
                    produto: {
                        id_produto: result[0].id_produto,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        resquest:{
                            tipo: 'GET',
                            descricao: 'Retorna todos os produtos.',
                            url: 'http://localhost:3000/produtos/'
                        }
                    }
                }

                return res.status(200).send({response})
            }
        )
    })

    // if (id === 'especial') {
    //     res.status(200).send({
    //         mensagem: 'Você descobriu o ID especial',
    //         id: id
    //     });
    // } else {
    //     res.status(200).send({
    //         mensagem: 'Você passou um ID'
    //     });
    // }
});

// ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
    // res.status(201).send({
    //     mensagem: 'Produto alterado'
    // })

    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error})}
        conn.query(
            'UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?',
            [req.body.nome, req.body.preco, req.body.id_produto],
            (error, result, fields) => {
                conn.release();

                const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    produtoAtualizado: {
                        id_produto: req.body.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        resquest:{
                                tipo: 'GET',
                                descricao: 'Retorna os detelhes de um produto.',
                                url: 'http://localhost:3000/produtos/'+req.body.id_produto
                            
                        }
                    }
                }

                // if(error){                    
                //     return res.status(500).send({
                //         error: error,
                //         response: null
                //     });                    
                // }


                return res.status(202).send({response})
                
                // return res.status(202).send({
                //         mensagem: 'Produto alterado com sucesso!'
                //         //id_produto: resultado.insertId
                // })
            }
        )
    })
});

// EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
    // res.status(201).send({
    //     mensagem: 'Produto excluído'
    // })

    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error})}
        conn.query(
            'DELETE FROM produtos WHERE id_produto = ?',
            [req.body.id_produto],
            (error, result, fields) => {
                conn.release();
                const response = {
                    mensagem: 'Produto removido com sucesso!!',
                    resquest:{
                        tipo: 'POST',
                        descricao: 'Insere um produto.',
                        url: 'http://localhost:3000/produtos/',
                        body: {
                            nome: 'String',
                            preco: 'Number'
                        }
                    
                }
                }
                // if(error){                    
                //     return res.status(500).send({
                //         error: error,
                //         response: null
                //     });                    
                // }
                return res.status(202).send({response})
                // return res.status(202).send({
                //         mensagem: 'Produto removido com sucesso!'
                //         //id_produto: resultado.insertId
                // })
            }
        )
    })
});

module.exports = router;