const inquirer = require('inquirer');
const database = require('./db/db');
const add = require('./utils/add');
const view = require('./utils/view');
const update = require('./utils/update');
const remove = require('./utils/delete');
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
                "Add Department",
                "Add Role",
                "Add Employee",
                "==================", //
                "View Department",
                "View Role",
                "View Employee",
                "View Employee by Manager", //bonus
                "==================", //
                "Update Employee Roles",
                "Update Employee Managers", // bonus
                "==================", //
                "Delete Department", // bonus
                "Delete Role", // bonus
                "Delete Employee", // bonus
            ]
        },
    ).then((user) => {
        // console.log(user);

        if (user.choice === "==================") {
            console.log('Please select a menu item...')
            setTimeout(() => { startDB() }, 1000);
        }
        else
            switch (user.choice) {
                case "Add Department":
                    add.department();
                    break;
                case "Add Role":
                    add.role();
                    break;
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
                        return company.dept = dept, intoView()
                    });

                    function intoView() {
                        add.employee(company)
                    }
                    break;
                /////////////////////
                case "View Department":
                    view.dept();
                    break;
                case "View Role":
                    view.role();
                    break;
                case "View Employee":
                    view.employee();
                    break;
                case "View Employee by Manager":
                    view.empByManager(); //bonus
                    break;
                /////////////////////
                case "Update Employee Roles":
                    update.updEmpRoles();
                    break;
                case "Update Employee Managers":
                    update.updEmpMang(); //bonus
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
