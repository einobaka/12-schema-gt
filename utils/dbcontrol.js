const inquirer = require('inquirer');
const database = require('../db/db');

class DbMethod {

    addEmp() {

        // inquirer.prompt(
        //     {
        //         type: 'list',
        //         name: 'management',
        //         message: 'Is this employee a manager?',
        //         choices: ['Yes', 'No']
        //     }
        // ).then((isManager) => {
        //     if (isManager !== 'Yes') { };
        // });
        let query = "SELECT * FROM employee WHERE manager_id > 0"
        database.query(query, (err, res) => {
            if (err) throw (err);
            // console.log(res)
            let list = [];
            res.forEach(manager => {
                // console.log(manager.first_name, manager.last_name)
                let manName = `${manager.first_name} ${manager.last_name}`
                list.push(manName);
            });       
            console.log(list)
        })

        let roles = [
            'Advisor',
            'Technician',
            'Office clerk',
            '--------',
            "Manager",
        ] // put in DB
        let department = ['Sales', 'Fixed Operations', 'Accounting']
        let managers = ['None', 'Joe Regal', 'Nate Avery', 'Mike Michaels'] // put in DB

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
                message: "Please select the employee's role",
                choices: roles
            },
            {
                type: "list",
                name: "manager",
                message: "Please select the employee's manager",
                choices: managers
            },
            {
                type: "list",
                name: "department",
                message: "Please select the employee's department",
                choices: department
            },
        ];
        // inquirer.prompt(employee)
        //     .then((employee) => {

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
        //     });
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
