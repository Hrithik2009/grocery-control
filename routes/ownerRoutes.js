const express =require('express');
const router = express.Router();
const {auths, checkOwner} = require('../middleware/auth');
const ownerController = require('../controllers/ownerController');

router.get('/dashboard',auths,checkOwner,ownerController.owner_dashboard);
router.get('/inventory',auths,checkOwner,ownerController.owner_inventory);
router.get('/sales',auths,checkOwner,ownerController.owner_sales);
router.get('/add_employee',auths,checkOwner,ownerController.add_employee_get);
router.post('/add_employee',auths,checkOwner,ownerController.add_employee_post);

module.exports = router;