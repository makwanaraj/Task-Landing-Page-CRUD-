const mysql = require('mysql');

//create mysql connection

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "das@369",
    database: "crud",
});

dbConn.connect( (err) => {
    if (err) throw err;
    console.log("Database Connected Sucesfully!!");
});

module.exports = dbConn;