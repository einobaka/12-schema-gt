const inquirer = require('inquirer');
const database = require('../db/db');
const startDB = require('../index/startDB');

class DbMethod {

    // constructor(roles, managers, department) {
    //     this.roles = roles;
    //     this.managers = managers;
    //     this.department = department;
    // }

    addEmp(company) {

        console.log(company);

        let employee = [
            {
                type: "input",
                name: "first_name",
                message: "Please enter the employee's first name.",
            },
            {
                type: "input",
                name: "last_name",
                message: "Please enter the employee's last name.",
            },
            {
                type: "list",
                name: "role",
                message: "Please select the employee's role.",
                choices: company.roles
            },
            {
                type: "list",
                name: "department",
                message: "Please select the employee's department.",
                choices: company.dept
            },
            {
                type: "list",
                name: "manager",
                message: "Please select the employee's manager.",
                choices: company.managers
            },
        ];

        inquirer.prompt(employee)
            .then((employee) => {
                // console.log(employee)

                let manager = employee.manager.split(' ');
                let managerID = '';

                database.query(
                    `SELECT id FROM employee WHERE first_name = '${manager[0]}' AND last_name = '${manager[1]}'`, (err, res) => {
                        if (err) throw (err);
                        // console.log(res)
                        return managerID = res[0].id;
                    });

                database.query(
                    `SELECT id FROM role WHERE title = '${employee.role}'`, (err, res) => {
                        if (err) throw (err);
                        // console.log(res[0].id)
                        if (res[0].id < 200) {
                            // console.log(res)
                            let insEmp = 'INSERT INTO employee SET ?'
                            database.query(
                                insEmp,
                                {
                                    first_name: employee.first_name,
                                    last_name: employee.last_name,
                                    role_id: res[0].id,
                                    manager_id: managerID
                                },
                                (err, res) => {
                                    if (err) throw (err);
                                    console.log(res);
                                    startDB();
                                });
                        }
                        else {
                            let insEmp = 'INSERT INTO employee SET ?'
                            database.query(insEmp,
                                {
                                    first_name: employee.first_name,
                                    last_name: employee.last_name,
                                    role_id: res[0].id,
                                },
                                (err, res) => {
                                    if (err) throw (err);
                                    console.log(res);
                                    startDB();
                                });
                        };
                    });
            });
    };
    // updateEMP() {
    //     inquirer.prompt(

    //         {
    //             type: "number",
    //             name: "salary",
    //             message: "Please enter the employee's salary.",
    //         },
    //     )
    // }
};

module.exports = new DbMethod;
// module.exports = addEmp;


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
