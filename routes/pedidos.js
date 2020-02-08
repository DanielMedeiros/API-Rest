const express = require('express');
const router = express.Router();

const PedidosController = require('../controllers/pedidosController')


// RETORNA TODOS OS PEDIDOS
router.get('/', PedidosController.getPedidos);

// INSERE UM PEDIDO
router.post('/', PedidosController.postPedidos);

// RETORNA OS DADOS DE UM PEDIDO
router.get('/:id_pedido', PedidosController.getIdPedidos);

// EXCLUI UM PEDIDO
router.delete('/', PedidosController.deletaPedidos);

module.exports = router;