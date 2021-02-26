const e = require("express");
var dbConn = require("../../config/db.config");

// table columns
var Employee = function (employee) {
  this.name = employee.name;
  this.email = employee.email;
  this.address = employee.address;
  this.mobile = employee.mobile;
  this.salary = employee.salary;
  this.gender = employee.gender;
};

// get all employees
Employee.getAllEmployees = (result) => {
  dbConn.query("SELECT * FROM employees", (err, res) => {
    if (err) {
      console.log("Error fetching data of employee", err);
      result(null, err);
    } else {
      console.log("Employees fetch data succesfully");
      result(null, res);
    }
  });
};

// get employee by ID from db
Employee.getEmployeeByID = (id, result) => {
  dbConn.query("SELECT * FROM employees WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching by employee ID", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

//create new employee
Employee.createEmployee = (employeeReqData, result) => {
  dbConn.query("INSERT INTO employees SET ?", employeeReqData, (err, res) => {
    if (err) {
      console.log("Error while inserting");
      result(null, err);
    } else {
      console.log("Employee created succesfully");
      result(null, res);
    }
  });
};

// update employee
Employee.updateEmployee = (id, employeeReqData, result) => {
  dbConn.query(
    "UPDATE employees SET name=?, email=?, address=?, mobile=?, salary=?, gender=? WHERE id=?",
    [employeeReqData.name, employeeReqData.email, employeeReqData.address, employeeReqData.mobile, employeeReqData.salary, employeeReqData.gender, id],
    (err, res) => {
      if (err) {
        console.log("Error while updating");
        result (null, err);
      } else {
        console.log("Employee updated succesfully");
        result (null, res);
      }
    }
  );
};

// delete employee
Employee.deleteEmployee = (id, result) => {
    dbConn.query("DELETE FROM employees WHERE id=?", [id], (err, res) => {
        if(err){ 
            console.log("Error while deleting the employee");
            result (null, err); 
        }
        else{
            result (null, res); 
        }
    }   )
}

module.exports = Employee;