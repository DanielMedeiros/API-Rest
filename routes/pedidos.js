const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).send({
        mensagens: 'Retorna os pedidos.'
    });
});

router.post('/', (req,res,next)=>{
    res.status(200).send({
        mensagens: 'Pedido foi criado'
    });
});


router.get('/:id_pedido', (req, res, next)=>{
    const id = req.params.id_pedido;
    
        res.status(200).send({
            mensagens: 'Detalhes de um pedido',
            id_pedido: id
    
        });    
    
});

router.patch('/', (req,res,next)=>{
    res.status(200).send({
        mensagens: 'Usando o PATCH dentro da rota de pedidos'
    });
});

router.delete('/', (req,res,next)=>{
    res.status(200).send({
        mensagens: 'Usando o DELETE dentro da rota de pedidos'
    });
});

module.exports = router;