const express = require('express');
const router = express.Router();

const UsuariosController = require('../controllers/usuariosController');

router.post('/cadastro', UsuariosController.cadastraUsuarios);

router.post('/login', UsuariosController.loginUsuarios);

module.exports = router