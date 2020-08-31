const inquirer = require('inquirer');
const database = require('../db/db');

class DBupdate {

    updEmpRoles(currEmpl) {
        inquirer.prompt([
            {
                type: "list",
                name: "employees",
                message: "Please select the employee which you'd like to update.",
                choices: currEmpl.names
            },
            {
                type: "list",
                name: "title",
                message: "Please select new role for the employee.",
                choices: currEmpl.newRole
            }
        ]).then((selection) => {

            let splitEmp = selection.employees.split(' ');
            let splitRol = selection.title.split(' ');

            database.query(`UPDATE employee SET role_id='${splitRol[0]}' WHERE id=${splitEmp[0]}`, (err, res) => {
                if (err) throw (err);
                console.table(res.affectedRows);
            })
        });
    }
    updEmpMang(currEmpl) {
        // console.log(currEmpl);
        inquirer.prompt([
            {
                type: "list",
                name: "employees",
                message: "Please select the employee which you'd like to update.",
                choices: currEmpl.names
            },
            {
                type: "list",
                name: "title",
                message: "Please select new manager for the employee.",
                choices: currEmpl.manager
            }
        ]).then((selection) => {
            // console.log(selection);
            let splitEmp = selection.employees.split(' ');
            let splitRol = selection.title.split(' ');

            database.query(`UPDATE employee SET manager_id='${splitRol[0]}' WHERE id=${splitEmp[0]}`, (err, res) => {
                if (err) throw (err);
                console.table(res.affectedRows);
            })
        })
    }
}

module.exports = new DBupdate;
