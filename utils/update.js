const inquirer = require('inquirer');
const database = require('../db/db');

class DBupdate {

    updEmpRoles(){
        database.query(`SELECT * FROM department WHERE  name = '${newRole.department}'`, (err, res) => {
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
                    console.log(res);
                })
        })
    }

    

    // updEmpMang(); //bonus

}

