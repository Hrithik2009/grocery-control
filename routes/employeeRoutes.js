const express =require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const {auths, checkEmployee} = require('../middleware/auth');

router.get('/dashboard',auths,checkEmployee,employeeController.employee_dashboard);
router.get('/inventory',auths,checkEmployee,employeeController.employee_inventory);
router.get('/sales',auths,checkEmployee,employeeController.employee_sales);

module.exports = router;