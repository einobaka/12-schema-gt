const database = require('../db/db');
const inquirer = require('inquirer');

class DBview {

    dept() {
        database.query(`SELECT * FROM department`, (err, res) => {
            if (err) throw err;
            console.table(res);
        })
    };

    role() {
        database.query(`SELECT * FROM role`, (err, res) => {
            if (err) throw err;
            console.table(res);
        })
    };
    employee() {
        database.query(`SELECT employee.first_name, employee.last_name, role.title, role.salary,department.name FROM employee, role, department WHERE employee.role_id=role.id AND role.department_id=department.id`, (err, res) => {
            if (err) throw err;
            console.table(res);

        })
    }
    empByManager() {
        database.query(`SELECT * FROM employee WHERE role_id > 199`, (err, res) => {
            if (err) throw err;
            let managers = [];
            res.forEach(manager => {
                // console.log(manager.first_name, manager.last_name)
                let manName = `${manager.first_name} ${manager.last_name}`
                managers.push(manName);
            })
            inquirer.prompt(
                [{
                    type: "list",
                    name: "managers",
                    message: "View Employee by manager or no manager, please select;",
                    choices: managers
                }]
            ).then((choice) => {
                // console.log(choice)
                database.query(
                    `SELECT id FROM employee WHERE first_name= '${manager[0]}' AND last_name= '${manager[1]}'`, (err, res) => {
                        if (err) throw (err);
                        // console.log(res[0].id)
                        database.query(`SELECT employee.first_name, employee.last_name, employee.manager_id FROM employee WHERE employee.manager_id='${res[0].id}'`, (err, res) => {
                            if (err) throw err;
                            console.table(res);
                        })
                    });
            });
        })
    }
};

module.exports = new DBview;