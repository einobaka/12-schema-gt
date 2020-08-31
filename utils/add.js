const inquirer = require('inquirer');
const database = require('../db/db');
// const startDB = require('../index');

class DBadd {

    department() {
        inquirer.prompt(
            [{
                type: "input",
                name: "department",
                message: "Please enter the department name.",
                validate: answer => {
                    if (answer === "") {
                        return "Department cannot be blank, please try again.";
                    }
                    return true;
                }
            }]
        ).then((entered) => {
            database.query('INSERT INTO department SET ?', { name: entered.department }, (err, res) => {
                if (err) throw (err);
                console.log("New department added.")
            })
        })
    };

    role() {
        inquirer.prompt(
            [{
                type: "list",
                name: "type",
                message: "Is this a manager role?",
                choices: ["Yes", "No"]
            }]
        )
            .then((choice) => {
                if (choice.type === "Yes") {
                    database.query("SELECT * FROM department WHERE id > 0", (err, res) => {
                        if (err) throw err;
                        // console.log(res)
                        const department = [];
                        res.forEach(dept => {
                            // console.log(dept)
                            let deptName = dept.name;
                            department.push(deptName);
                        });
                        database.query('SELECT id FROM role ORDER BY id DESC', (err, res) => {
                            // console.log(res[0].id)
                            inquirer.prompt([
                                {

                                    type: "number",
                                    name: "id",
                                    message: `Please enter the manager role ID. Must be greater than ${res[0].id}`,
                                    validate: answer => {
                                        if (answer === "") {
                                            return "Number cannot be blank.";
                                        }
                                        return true;
                                    }
                                },
                                {

                                    type: "prompt",
                                    name: "title",
                                    message: "Please enter the manager role title.",
                                    validate: answer => {
                                        if (answer === "") {
                                            return "Title cannot be blank.";
                                        }
                                        return true;
                                    }
                                },
                                {
                                    type: "prompt",
                                    name: "salary",
                                    message: "Please enter this role's salary.",
                                    validate: answer => {
                                        //regex number validation
                                        if (answer.match(/^[1-9]\d*$/)) {
                                            return true;
                                        }
                                        return "Entry must be a numeric entry."
                                    }
                                },
                                {
                                    type: "list",
                                    name: "department",
                                    message: "Please enter this role's department",
                                    choices: department
                                }])
                                .then((newRole) => {
                                    // console.log(choice)
                                    database.query(`SELECT id FROM department WHERE  name = '${newRole.department}'`, (err, res) => {
                                        // console.log(res[0].id)
                                        // return role.department_ID = res[0].id
                                        database.query(`INSERT INTO role SET ?`,
                                            {
                                                id: newRole.id,
                                                title: newRole.title,
                                                salary: newRole.salary,
                                                department_ID: res[0].id
                                            },
                                            (err, res) => {
                                                if (err) throw err;
                                                console.log("New role added.")
                                            })
                                    })
                                })
                        })
                    });
                }
                else {
                    database.query("SELECT * FROM department WHERE id > 0", function (err, res) {
                        if (err) throw err;
                        // console.log(res)
                        const department = [];
                        res.forEach(dept => {
                            // console.log(dept)
                            let deptName = dept.name;
                            department.push(deptName);
                        });
                        inquirer.prompt([{
                            type: "prompt",
                            name: "title",
                            message: "Please enter the role title.",
                            validate: answer => {
                                if (answer === "") {
                                    return "Title cannot be blank.";
                                }
                                return true;
                            }
                        },
                        {
                            type: "prompt",
                            name: "salary",
                            message: "Please enter this role's salary.",
                            validate: answer => {
                                //regex number validation
                                if (answer.match(/^[1-9]\d*$/)) {
                                    return true;
                                }
                                return "Entry must be a numeric entry."
                            }
                        },
                        {
                            type: "list",
                            name: "department",
                            message: "Please enter this role's department",
                            choices: department
                        }])
                            .then((newRole) => {
                                // console.log(choice)
                                database.query(`SELECT id FROM department WHERE name = '${newRole.department}'`, (err, res) => {
                                    // console.log(res[0].id)
                                    // return role.department_ID = res[0].id
                                    database.query(`INSERT INTO role SET ?`,
                                        {
                                            title: newRole.title,
                                            salary: newRole.salary,
                                            department_ID: res[0].id
                                        },
                                        (err, res) => {
                                            if (err) throw err;
                                            console.log("New employee added.")
                                        })
                                })
                            })
                    });
                }
            })
    }

    employee(company) {

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
                                    console.table(res);
                                    // return startDB();
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
                                    console.table(res);
                                    // return startDB();
                                });
                        };
                    });
            });
    };
};

module.exports = new DBadd;