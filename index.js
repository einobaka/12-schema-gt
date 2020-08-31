const inquirer = require('inquirer');
const database = require('./db/db');
const add = require('./utils/add');
const view = require('./utils/view');
const update = require('./utils/update');
const remove = require('./utils/delete');

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
                "View Employees",
                "View Employees by Manager", //bonus
                "==================", //
                "Update Employee Roles",
                "Update Employee Managers", // bonus
                "==================", //
                "Delete Department", // bonus
                "Delete Role", // bonus
                "Delete Employee", // bonus
                "==================", //
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
                        return company.dept = dept, intoEmp()
                    });

                    function intoEmp() {
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
                case "View Employees":
                    view.employee();
                    break;
                case "View Employees by Manager":
                    view.empByManager(); //bonus
                    break;
                /////////////////////
                case "Update Employee Roles":
                    const currEmpl = {
                        names: [],
                        newRole: [],
                    }
                    database.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee, role, department WHERE employee.role_id=role.id AND role.department_id=department.id;`, (err, res) => {
                        if (err) throw (err);
                        // console.log(res);
                        let empList = [];
                        res.forEach(employee => {
                            // console.log(employee.first_name, employee.last_name, employee.title)
                            let empInfo = `${employee.id} >> ${employee.first_name} ${employee.last_name} << ${employee.title}`
                            // console.log(empInfo)
                            empList.push(empInfo);
                        })
                        return currEmpl.names = empList;
                    })

                    database.query(`SELECT title, id FROM role`, (err, res) => {
                        if (err) throw (err);
                        // console.log(res);
                        let titles = [];
                        res.forEach(selected => {
                            let title = `${selected.id} >> ${selected.title}`
                            titles.push(title);
                        })
                        return currEmpl.newRole = titles, intoUpd();
                    })

                    function intoUpd() {
                        update.updEmpRoles(currEmpl);
                    }
                    break;
                case "Update Employee Managers":
                    const newMan = {
                        names: [],
                        manager: [],
                    }
                    database.query(`SELECT * FROM employee WHERE role_id < 200`, (err, res) => {
                        if (err) throw (err);
                        // console.log(res);
                        let empList = [];
                        res.forEach(employee => {
                            // console.log(employee.first_name, employee.last_name, employee.title)
                            let empInfo = `${employee.id} >> ${employee.first_name} ${employee.last_name}`
                            // console.log(empInfo)
                            empList.push(empInfo);
                        })
                        return newMan.names = empList;
                    })
                    database.query(`SELECT * FROM employee WHERE role_id >= 200`, (err, res) => {
                        if (err) throw (err);
                        // console.log(res);
                        let manList = [];
                        res.forEach(selected => {
                            let manager = `${selected.id} >>  ${selected.first_name} ${selected.last_name}`
                            manList.push(manager);
                        })
                        return newMan.manager = manList, intoUpdMan();
                    })
                    function intoUpdMan() {
                        update.updEmpMang(newMan);
                    }
                    break;
                /////////////////////
                case "Delete Department":

                    database.query(`SELECT * FROM department WHERE NOT id=1
                    `, (err, res) => {
                        if (err) throw (err);
                        let deparments = [];
                        res.forEach(selected => {
                            let name = `${selected.name}`
                            deparments.push(name);
                        })
                        remove.delDept(deparments);
                    })
                    break;
                case "Delete Role":

                    database.query(`SELECT * FROM role WHERE NOT id=200`, (err, res) => {
                        if (err) throw (err);
                        let roles = [];
                        res.forEach(selected => {
                            let title = `${selected.title}`
                            roles.push(title);
                        })
                        remove.delRole(roles);
                    })
                    break;

                case "Delete Employee":

                    database.query(`SELECT * FROM employee WHERE NOT id=1`, (err, res) => {
                        if (err) throw (err);
                        let employees = [];
                        res.forEach(selected => {
                            let employee = `${selected.first_name} ${selected.last_name}`
                            employees.push(employee);
                        })
                        remove.delEmp(employees);
                    })
                    break;
            }
    })
};
