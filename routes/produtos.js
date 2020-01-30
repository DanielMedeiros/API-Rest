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
            (error, resultado, fields) => {
                if(error) {return res.status(500).send({ error: error})}
                return res.status(200).send({response: resultado})
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
            (error, resultado, fields) => {
                conn.release();

                if(error){                    
                    return res.status(500).send({
                        error: error,
                        response: null
                    });                    
                }

                res.status(201).send({
                        mensagem: 'Produto inserido com sucesso!',                        
                        //id_produto: resultado.insertId
                })
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
            (error, resultado, fields) => {
                if(error) {return res.status(500).send({ error: error})}
                return res.status(200).send({response: resultado})
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
            (error, resultado, fields) => {
                conn.release();

                if(error){                    
                    return res.status(500).send({
                        error: error,
                        response: null
                    });                    
                }

                res.status(202).send({
                        mensagem: 'Produto alterado com sucesso!'
                        //id_produto: resultado.insertId
                })
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
            (error, resultado, fields) => {
                conn.release();

                if(error){                    
                    return res.status(500).send({
                        error: error,
                        response: null
                    });                    
                }

                res.status(202).send({
                        mensagem: 'Produto removido com sucesso!'
                        //id_produto: resultado.insertId
                })
            }
        )
    })
});

module.exports = router;