const express =require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {auths, checkUser} = require('../middleware/auth');

router.get('/products', auths, checkUser, productController.getProducts);
router.post('/addproducts', checkUser, productController.addProduct);

module.exports = router;