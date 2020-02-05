const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');
const login = require('../middleware/login');


//Storage para fazer upload de imagens
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString()+file.originalname);
    }
})

const filefilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);        
    }else{        
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits:{
        // limitado a 5 mega a foto
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: filefilter
});




// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {    

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
                            imagem_produto: prod.imagem_produto,                          
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
router.post('/', login.obrigatorio, upload.single('produto_imagem'), (req, res, next) => {
    console.log('post..');
    console.log(req.file);

    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error})}
        conn.query(
            'INSERT INTO produtos (nome,preco,imagem_produto)VALUES(?,?,?)',
            [ 
                req.body.nome,
                req.body.preco,
                req.file.path
            ],
            (error, result, fields) => {
                conn.release();
                if(error) {return res.status(500).send({ error: error})}
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado: {
                        id_produto: result.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        imagem_produto: req.file.path,
                        resquest:{
                            tipo: 'POST',
                            descricao: 'Insere um produto.',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }
             
                return res.status(201).send({response});
            }
        )
    })
    
   
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
                        imagem_produto: result[0].imagem_produto,
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

   
});

// ALTERA UM PRODUTO
router.patch('/', login.obrigatorio, (req, res, next) => {
 
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

                return res.status(202).send({response})
                
            }
        )
    })
});

// EXCLUI UM PRODUTO
router.delete('/', login.obrigatorio, (req, res, next) => {

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
              
                return res.status(202).send({response})
            
            }
        )
    })
});

module.exports = router;