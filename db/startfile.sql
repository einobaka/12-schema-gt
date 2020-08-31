USE employeeDB;
INSERT INTO department
    (name)
VALUES
    ('No Department'),
    ('Sales'),
    ('Fixed Operations'),
    ('Office');

USE employeeDB;
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Salesman', 80000, 2),
    ('Advisor', 80000, 3),
    ('Technician', 80000, 3),
    ('Office Clerk', 40000, 4);

USE employeeDB;
INSERT INTO role
    (id, title, salary, department_id)
VALUES
    ('201', 'Sales Manager', 110000, 2),
    ('202', 'Fixed Operations Manager', 110000, 3),
    ('203', 'Office Manager', 75000, 4),
    ('200', 'No Role', 0, 1);

USE employeeDB;
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES

    ('No', 'Manager', 200, null),
    ('John', 'Doe', 201, null),
    ('Don', 'Joe', 202, null),
    ('Gerald', 'Don', 203, null);

USE employeeDB;
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jonn', 'Donner', 1, 2),
    ('Conner', 'Jones', 2, 3),
    ('Jane', 'Doe', 3, 4),
    ('Stan', 'Jacobs', 4, 1);