const EmployeeModel = require('../models/employee.model');

// get all employees data
exports.getEmployeeList = (req, res) => {
    EmployeeModel.getAllEmployees((err, employees) => {
        console.log('We are here');
        if (err){
        res.send(err);
        }
        console.log('Employees', employees);
        res.send(employees);
    });
}

//get employed by id
exports.getEmployeeByID = (req, res) => {
    EmployeeModel.getEmployeeByID(req.params.id, (err, employee) => {
        if(err) res.send(err);
        console.log('single employee data',employee);
        res.send(employee);
    })  
}

// create new employee
exports.createNewEmployee = (req, res) => {
    const employeeReqData = new EmployeeModel(req.body);
    console.log('employeeReqData', employeeReqData);
    // check null
    if(req.body.costructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }
    else{
        EmployeeModel.createEmployee(employeeReqData, (err, employee) => {
            if(err) res.send(err);
            res.json({status: true, message:'Employee Created Successfully', data: employee.insertId});
        });
    }
}

// update employee data
exports.updateEmployee = (req, res) => {
    const employeeReqData = new EmployeeModel(req.body);
    console.log('employeeReqData update', employeeReqData);
    // check null
    if(req.body.costructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }
    else{
        EmployeeModel.updateEmployee(req.params.id,employeeReqData, (err, employee) => {
            if(err) res.send(err);
            res.json({status: true, message:'Employee Updated Successfully'});
        });
    }
}

// delete employee data
exports.deleteEmployee = (req, res) => {
    EmployeeModel.deleteEmployee(req.params.id, (err, employee) => {
        if(err) res.send(err);
        res.json({status: true, message:'Employee Deleted Successfully'});
    })
}