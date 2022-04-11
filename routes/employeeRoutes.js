const express =require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const {auths, checkEmployee} = require('../middleware/auth');

router.get('/dashboard',auths,checkEmployee,employeeController.employee_dashboard);
router.get('/inventory',auths,checkEmployee,employeeController.employee_inventory);
router.get('/sales',auths,checkEmployee,employeeController.employee_sales);
router.get('/checkout_order',auths,checkEmployee,employeeController.checkout_order_get);
router.post('/checkout_order',auths,checkEmployee,employeeController.checkout_order_post);
router.get('/view_orders',auths,checkEmployee,employeeController.view_orders);
router.get('/view_profile',auths,checkEmployee,employeeController.view_profile);
router.get('/dashboard/stats',auths,checkEmployee,employeeController.employee_dashboard_stats);

module.exports = router;