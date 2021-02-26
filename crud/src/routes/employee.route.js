const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee.controller');

// Get all employees
router.get('/', employeeController.getEmployeeList);

// Get employee by id
router.get('/:id', employeeController.getEmployeeByID);

// Create new employee
router.post('/', employeeController.createNewEmployee);

// Update the employee details
router.put('/:id', employeeController.updateEmployee);

// Delete the employees details
router.delete('/:id',employeeController.deleteEmployee);

module.exports = router;


// javascript get form values on submit