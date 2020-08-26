const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '!Q2w3e123',
    database: 'employeeDB',

});

module.exports = database;