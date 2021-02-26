const express = require('express');
const bodyParser = require('body-parser');  

// create express app
const app = express();

//setup the server port
const port = process.env.PORT || 5000;

// parse request data content type application/ x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));

//parse request data  content type application/json
app.use(bodyParser.json());

// give Access-Control-Allow-Origin'
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
// root route for server
app.get('/', (req, res) => {
    res.send('Hello');
    });

//import employee routes
const employeeRoutes = require('./src/routes/employee.route');

//create employee routes
app.use('/api/employees', employeeRoutes);

// listen to the port 
app.listen(port, () => {
    console.log(`Express Server is Running at port ${port}`);
});