const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');


const ProdutosController = require('../controllers/produtosController');


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
router.get('/', ProdutosController.getProdutos);

// INSERE UM PRODUTO
router.post('/', login.obrigatorio, upload.single('produto_imagem'), ProdutosController.postProdutos);

// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', ProdutosController.getIdProdutos);

// ALTERA UM PRODUTO
router.patch('/', login.obrigatorio, ProdutosController.updateProdutos);

// EXCLUI UM PRODUTO
router.delete('/', login.obrigatorio, ProdutosController.deleteProdutos);

module.exports = router;