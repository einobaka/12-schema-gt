const inquirer = require('inquirer');
const database = require('./db/db');
const dbadd = require('./utils/add');
const dbview = require('./utils/view');
const dbdelete = require('./utils/delete');
// const { department } = require('./utils/add');
// const addEmp = require('./utils/dbcontrol');

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
                "Add Employee",
                "================", //
                "View Department",
                "View Role",
                "View Employee",
                "View Employee by Manager", //bonus
                "================", //
                "Update Employee Roles",
                "Update Employee Managers", //bonus
                "================", //
                "Delete Department",
                "Delete Role",
                "Delete Employee",        
            ]
        },
    ).then((user) => {
        // console.log(user);

        if (user.choice === "================") {
            console.log('Please select the employee role.')
            startDB();
        }
        
        switch (user.choice) {
            case "Add Employee":
                // dbmethod.addEmp();
                let company = {
                    managers: [],
                    roles: [],
                    dept: [],
                }
                let queryMan = "SELECT * FROM employee WHERE role_id > 199"
                let queryRol = "SELECT * FROM role WHERE id > 0"
                let queryDep = "SELECT * FROM department WHERE id > 0"
                database.query(queryMan, (err, res) => {
                    if (err) throw (err);
                    // console.log(res)
                    let managers = [];
                    res.forEach(manager => {
                        // console.log(manager.first_name, manager.last_name)
                        let manName = `${manager.first_name} ${manager.last_name}`
                        managers.push(manName);
                    })
                    return company.managers = managers
                })
                database.query(queryRol, (err, res) => {
                    if (err) throw (err);
                    // console.log(res)
                    let roles = [];
                    res.forEach(role => {
                        // console.log(manager.first_name, manager.last_name)
                        let roleTitle = `${role.title}`
                        roles.push(roleTitle);
                    })
                    return company.roles = roles
                });
                database.query(queryDep, (err, res) => {
                    if (err) throw (err);
                    // console.log(res)
                    let dept = [];
                    res.forEach(department => {
                        // console.log(manager.first_name, manager.last_name)
                        let deptName = `${department.name}`
                        dept.push(deptName);
                    })
                    return company.dept = dept, view()
                });

                function view() {
                    dbadd.addEmp(company)
                }
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

module.exports = startDB;