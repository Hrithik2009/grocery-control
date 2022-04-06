const express =require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {auths, checkOwner} = require('../middleware/auth');

router.get('/owner/products', auths, checkOwner, productController.getProducts);
router.post('/owner/addproducts', auths, checkOwner, productController.addProduct);
router.get('/owner/editproduct/:id', auths, checkOwner, productController.getEditproduct);
router.patch('/owner/editproduct', auths, checkOwner, productController.editproduct);
router.delete('/owner/delproduct', auths, checkOwner, productController.deleteProduct);

module.exports = router;