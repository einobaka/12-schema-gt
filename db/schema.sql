DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE department
(
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

USE employeeDB;

CREATE TABLE role
(
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_ID INT,
    PRIMARY KEY(id),
    FOREIGN KEY (department_ID) REFERENCES department(id) 
    ON UPDATE CASCADE
    ON DELETE CASCADE
    );
    

CREATE TABLE employee
(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id),
	FOREIGN KEY (role_id) REFERENCES role(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);