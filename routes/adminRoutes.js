const express =require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {auths, checkAdmin} = require('../middleware/auth');

router.get('/dashboard',auths,checkAdmin,adminController.admin_dashboard);
router.get('/add_shop',auths,checkAdmin,adminController.add_shop_get);
router.post('/add_shop',auths,checkAdmin,adminController.add_shop_post);
router.get('/sales',auths,checkAdmin,adminController.admin_sales);

module.exports = router;