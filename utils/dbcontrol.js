const inquirer = require('inquirer');
const database = require('../db/db');
const { addListener } = require('nodemon');

class DbMethod {

    constructor(roles, managers, department) {
        this.roles = roles;
        this.managers = managers;
        this.department = department;
    }

    addEmp(company) {

        // console.log(company);

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
                name: "manager",
                message: "Please select the employee's manager.",
                choices: company.managers
            },
            {
                type: "list",
                name: "department",
                message: "Please select the employee's department.",
                choices: company.dept
            },
        ];
        inquirer.prompt(employee)
            .then((employee) => {

                // console.log(employee)
                // console.log(company.managers.id);
                database.query(`SELECT id FROM role WHERE title = '${employee.role}'`, (err, res) => {
                    if (err) throw (err);
                    // console.log(res[0].id)
                    if (res[0].id < 200) {
                        let insEmp = 'INSERT INTO employee SET ?'
                        database.query(insEmp,
                            {
                                first_name: employee.first_name,
                                last_name: employee.last_name,
                                role_id: res[0].id
                            },
                            (err, res) => {
                                if (err) throw (err);
                                console.log(res);
                            });
                    }
                    else {
                        let insEmp = 'INSERT INTO employee SET ?'
                        database.query(insEmp,
                            {
                                first_name: employee.first_name,
                                last_name: employee.last_name,
                                manager_id: res[0].id
                            },
                            (err, res) => {
                                if (err) throw (err);
                                console.log(res);
                            });
                    }
                })


                // insEmp += '(SELECT id from role where title = employee.role)'
                // let empRole = `(SELECT id from role where title = ${employee.role})`
                // let empRole = '(SELECT id from role where title = ' + employee.role + ')'

                // database.query(
                //     role,
                //     (err, res) => {
                //         if (err) throw (err);
                //         console.log(res);
                //     })

                // let empValues = {
                //     first_name: employee.first_name,
                //     last_name: employee.last_name,
                //     role_id: employee.
                // }

                //         let insert = 'INSERT INTO employee SET ?';
                //         let empValues = {
                //             first_name: employee.first_name,
                //             last_name: employee.last_name,
                //         };
                //         database.query(insert, empValues, (err, res) => {
                //             if (err) throw (err);
                //             console.log('names inserted');
                //         })
                //         //////
                //         let insertRole = "INSERT INTO role SET ?";
                //         let empRole = {
                //             title: employee.role,
                //             // salary: employee.salary,
                //         };
                //         database.query(insertRole, empRole, (err, res) => {
                //             if (err) throw (err);
                //             console.log('title inserted');
                //         })
                //         //////
                //         let insertDept = "INSERT INTO department SET ?"
                //         let empDept = {
                //             name: employee.department,
                //         }
                //         database.query(insertDept, empDept, (err, res) => {
                //             if (err) throw (err);
                //             console.log('dept inserted');
                //         })
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
