const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).send({
        mensagens: 'Usando o GET dentro da rota de produtos'
    });
});

router.post('/', (req,res,next)=>{
    res.status(200).send({
        mensagens: 'Usando o POST dentro da rota de produtos'
    });
});


router.get('/:id_produto', (req, res, next)=>{
    const id = req.params.id_produto;

    if(id === 'especial'){
        res.status(200).send({
            mensagens: 'Parabéns.. você descobriu o ID especial!!',
            id: id
    
        });
    }else{
        res.status(200).send({
            mensagens: 'Você pasou um ID.',
            id: id
    
        });
    }
    
});

router.patch('/', (req,res,next)=>{
    res.status(200).send({
        mensagens: 'Usando o PATCH dentro da rota de produtos'
    });
});

router.delete('/', (req,res,next)=>{
    res.status(200).send({
        mensagens: 'Usando o DELETE dentro da rota de produtos'
    });
});

module.exports = router;