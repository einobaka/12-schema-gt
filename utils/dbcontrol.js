const inquirer = require('inquirer');
const database = require('../db/db');

class DbMethod {

    addEmp() {

        let managers = ['Joe Regal', 'Nate Avery', 'Mike Michaels']
        let employee = [
            // {
            //     type: "input",
            //     name: "first_name",
            //     message: "Please enter the employee's first name.",
            // },
            // {
            //     type: "input",
            //     name: "last_name",
            //     message: "Please enter the employee's last name.",
            // },
            // {
            //     type: "list",
            //     name: "title",
            //     message: "Please select the employee's role",
            //     choices: [
            //         "General Manager",
            //         "Sales Manager",
            //         "Salesman",
            //         "Service Manager",
            //         "Service Advisor",
            //         "Technician",
            //         "Parts Manager",
            //         "Parts Advisor",
            //         "Accounting Controller",
            //         "Receivables Clerk",
            //         "Payables Clerk",
            //         "Cashier"
            //     ]
            // },
            {
                type: "list",
                name: "manager",
                message: "Please select the employee's manager",
                choices: managers
            }

        ];

        inquirer.prompt(employee)
            // "Add Department",
            // "Add Role", 
            // [

            //     // {
            //     //     type: "list",
            //     //     name: "department",
            //     //     message: "Please select the employee's department",
            //     //     choices: [
            //     //         "Sales",
            //     //         "Fixed Operations",
            //     //         "Office",
            //     //     ]
            //     // }
            // ])
            .then((employee) => {
                let insertEmp = "INSERT INTO employee SET ?";
                let empValues = {
                    first_name: employee.first_name,
                    last_name: employee.last_name,
                };
                // database.query(insertEmp, empValues, (err, res) => {
                //     if (err) throw (err);
                //     console.log('name inserted');
                // })
                // //////
                // let insertRole = "INSERT INTO role SET ?";
                // let empRole = {
                //     title: employee.title,
                //     salary: employee.salary,
                // };
                // database.query(insertRole, empRole, (err, res) => {
                //     if (err) throw (err);
                //     console.log('title inserted');
                // })
                // //////
                // let insertDept = "INSERT INTO department SET ?"
                // let empDept = {
                //     name: employee.department,
                // }
                // database.query(insertDept, empDept, (err, res) => {
                //     if (err) throw (err);
                //     console.log('dept inserted');
                // })
            });
    };
    updateEMP() {
        inquirer.prompt(

            {
                type: "number",
                name: "salary",
                message: "Please enter the employee's salary.",
            },
        )
    }
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