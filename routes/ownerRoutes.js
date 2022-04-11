const express =require('express');
const router = express.Router();
const {auths, checkOwner} = require('../middleware/auth');
const ownerController = require('../controllers/ownerController');

router.get('/dashboard',auths,checkOwner,ownerController.owner_dashboard);
router.get('/inventory',auths,checkOwner,ownerController.owner_inventory);
router.get('/sales',auths,checkOwner,ownerController.owner_sales);
router.get('/add_employee',auths,checkOwner,ownerController.add_employee_get);
router.post('/add_employee',auths,checkOwner,ownerController.add_employee_post);
router.get('/view_employees',auths,checkOwner,ownerController.view_employees);
router.get('/view_profile',auths,checkOwner,ownerController.view_owner_profile);
router.get('/dashboard/stats',auths,checkOwner,ownerController.owner_dashboard_stats);

module.exports = router;