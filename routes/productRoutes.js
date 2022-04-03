const express =require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {auths, checkUser} = require('../middleware/auth');

router.get('/products', auths, checkUser, productController.getProducts);
router.post('/addproducts', auths, checkUser, productController.addProduct);
router.get('/editproduct/:id', auths, checkUser, productController.getEditproduct);
router.patch('/editproduct', auths, checkUser, productController.editproduct);
router.delete('/delproduct', auths, checkUser, productController.deleteProduct);

module.exports = router;