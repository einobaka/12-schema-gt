const inquirer = require('inquirer');
const database = require('../db/db');

class DBremove {

    delDept(departments) {
        // console.log(deparments)
        inquirer.prompt(
            [{
                type: "list",
                name: "department",
                message: "Please select deparment which to remove. WARNING: THIS WILL REMOVE ROLES AND EMPLOYEES TIED TO THIS DEPARMENT.",
                choices: departments
            },
            ]
        ).then((selection) => {

            inquirer.prompt(
                [{
                    type: "list",
                    name: "choice",
                    message: `Are you sure you want to delete ${selection.department}?`,
                    choices: [`Yes, delete ${selection.department}`, `No, do not delete ${selection.department}`]
                }]
            ).then((answer) => {
                if (answer.choice === `Yes, delete ${selection.department}`) {
                    let finalChoice = answer.choice.split(`Yes, delete `)
                    // console.log(finalChoice[1])
                    database.query(`DELETE FROM department WHERE name='${finalChoice[1]}'`, (err, res) => {
                        if (err) throw (err);
                        console.log("Department deleted.")
                    })
                }
            })
        })
    }
    delRole(roles) {
        // console.log(roles)
        inquirer.prompt(
            [{
                type: "list",
                name: "roles",
                message: "Please select role which to remove. WARNING: THIS WILL REMOVE EMPLOYEES TIED TO THIS ROLE.",
                choices: roles
            },
            ]
        ).then((selection) => {

            inquirer.prompt(
                [{
                    type: "list",
                    name: "choice",
                    message: `Are you sure you want to delete ${selection.roles}?`,
                    choices: [`Yes, delete ${selection.roles}`, `No, do not delete ${selection.roles}`]
                }]
            ).then((answer) => {
                if (answer.choice === `Yes, delete ${selection.roles}`) {
                    let finalChoice = answer.choice.split(`Yes, delete `)
                    // console.log(finalChoice[1])
                    database.query(`DELETE FROM role WHERE title='${finalChoice[1]}'`, (err, res) => {
                        if (err) throw (err);
                        console.log("Role deleted.")
                    })
                }
            })
        })
    }
    delEmp(employee) {
        // console.log(employee)
        inquirer.prompt(
            [{
                type: "list",
                name: "employee",
                message: "Please select deparment which to remove.",
                choices: employee
            },
            ]
        ).then((selection) => {

            inquirer.prompt(
                [{
                    type: "list",
                    name: "choice",
                    message: `Are you sure you want to delete ${selection.employee}?`,
                    choices: [`Delete ${selection.employee}`, `Do not delete ${selection.employee}`]
                }]
            ).then((answer) => {
                if (answer.choice === `Delete ${selection.employee}`) {
                    let finalChoice = answer.choice.split(' ')
                    // console.log(finalChoice)
                    database.query(`DELETE FROM employee WHERE first_name='${finalChoice[1]}' AND last_name='${finalChoice[2]}'`, (err, res) => {
                        if (err) throw (err);
                        console.log("Employee deleted.")
                    })
                }
            })
        })
    }
}

module.exports = new DBremove;