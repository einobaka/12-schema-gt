const inquirer = require('inquirer');
const database = require('./db/db');
const dbmethod = require('./utils/dbcontrol');

// addDept();
// addRole();
// addEmp();
// /////////////////////
// viewDept();
// viewRole();
// viewEmployee();
// viewEmpByMang(); //bonus
// /////////////////////
// updEmpRoles();
// updEmpMang(); //bonus
// /////////////////////
// delDept(); //bonus
// delRole(); //bonus
// delEmp(); //bonus


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
                dbmethod.addDept();
                break;
            case "Add Role":
                dbmethod.addRole();
                break;
            case "Add Employee":
                dbmethod.addEmp();
                break;
            /////////////////////
            case "View Department":
                dbmethod.viewDept();
                break;
            case "View Role":
                dbmethod.viewRole();
                break;
            case "View Employee":
                dbmethod.viewEmployee();
                break;
            case "View Employee by Manager":
                dbmethod.viewEmpByMang(); //bonus
                break;
            /////////////////////
            case "Update Employee Roles":
                dbmethod.updEmpRoles();
                break;
            case "Update Employee Managers":
                dbmethod.updEmpMang(); //bonus
                break;
            /////////////////////
            case "Delete Department":
                dbmethod.delDept(); //bonus
                break;
            case "Delete Role":
                dbmethod.delRole(); //bonus
                break;
            case "Delete Employee":
                dbmethod.delEmp(); //bonus
                break;
        }

    })
};