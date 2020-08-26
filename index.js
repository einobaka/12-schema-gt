const inquirer = require('inquirer');
const database = require('./db/db');

database.connect(function (err) {
    if (err) throw err;
    connect();
})

function connect() {
    console.log('...DB connection established...');
    startDB();
};

function startDB() {
    inquirer.prompt(
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "Add Department",
                "Add Role",
                "Add Employee",
                /////////////////////
                "View Department",
                "View Role",
                "View Employee",
                "View Employee by Manager", //bonus
                /////////////////////
                "Update Employee Roles",
                "Update Employee Managers", //bonus
                /////////////////////
                "Delete Department",
                "Delete Role",
                "Delete Employee",
            ]
        },
    ).then((user) => {
        console.log(user);

        switch (user.choice) {
            case "Add Department":
                addDept();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmp();
                break;
            /////////////////////
            case "View Department":
                viewDept();
                break;
            case "View Role":
                viewRole();
                break;
            case "View Employee":
                viewEmployee();
                break;
            case "View Employee by Manager":
                viewEmpByMang(); //bonus
                break;
            /////////////////////
            case "Update Employee Roles":
                updEmpRoles();
                break;
            case "Update Employee Managers":
                updEmpMang(); //bonus
                break;
            /////////////////////
            case "Delete Department":
                delDept(); //bonus
                break;
            case "Delete Role":
                delRole(); //bonus
                break;
            case "Delete Employee":
                delEmp(); //bonus
                break;
        }

    })
};