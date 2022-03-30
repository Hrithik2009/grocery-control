const express =require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {checkUser} = require('../middleware/auth');

router.post('/addproducts', checkUser, productController.addProduct);

module.exports = router;