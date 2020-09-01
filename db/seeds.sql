USE employee_tracker_db;

-- Department

-- id 1
INSERT INTO department(name)
VALUES("Sales");
-- id 2
INSERT INTO department(name)
VALUES("Engineering");
-- id 3
INSERT INTO department(name)
VALUES("Finance");
-- id 4
INSERT INTO department(name)
VALUES("Legal");

SELECT * FROM department;

-- Roles
-- id 1
INSERT INTO role(title, salary, department_id)
VALUES("Sales Lead", 100000, 1);
-- id 2
INSERT INTO role(title, salary, department_id)
VALUES("Salesperson", 80000, 1);
-- id 3
INSERT INTO role(title, salary, department_id)
VALUES("Lead Engineer", 150000, 2);
-- id 4
INSERT INTO role(title, salary, department_id)
VALUES("Software Engineer", 120000, 2);
-- id 5
INSERT INTO role(title, salary, department_id)
VALUES("Accountant", 125000, 3);
-- id 6
INSERT INTO role(title, salary, department_id)
VALUES("Legal Team Lead", 250000, 4);
-- id 7
INSERT INTO role(title, salary, department_id)
VALUES("Lawyer", 190000, 4);

SELECT * FROM role;

-- Employees

-- Managers
INSERT INTO employee(first_name, last_name, role_id)
VALUES("Ashley", "Rodriguez", 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("John", "Wick", 1, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Mike", "Chan", 2, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Kevin", "Tupik", 4, 1);

INSERT INTO employee(first_name, last_name, role_id)
VALUES("Malia", "Brown", 5);

INSERT INTO employee(first_name, last_name, role_id)
VALUES("Sarah", "Lourd", 6);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Tom", "Allen", 7, 6);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Christian", "Eckenrode", 3, 3);

SELECT * FROM employee;

