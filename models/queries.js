const queries = {
    all_employees : `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager ` +
                    `FROM employee as e ` +
                    `LEFT JOIN employee AS m ON e.manager_id = m.id ` +
                    `LEFT JOIN role ON e.role_id = role.id ` +
                    `LEFT JOIN department ON role.department_id = department.id ` +
                    `ORDER BY e.id`,
    employees_department: `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department ` +
                    `FROM employee ` +
                    `INNER JOIN role ON employee.role_id = role.id ` +
                    `INNER JOIN department ON role.department_id = department.id ` +
                    `ORDER BY employee.id`,
    employees_manager: `SELECT e.id, e.last_name, CONCAT(m.first_name, ' ', m.last_name) AS manager ` +
                    `FROM employee AS e LEFT JOIN employee AS m ON e.manager_id = m.id`,
    employee_names_id: `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name FROM employee`,
    roles_title_id: `SELECT id, title FROM role ORDER BY role.id`,
    managers_names_id: `SELECT DISTINCT m.id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee AS m JOIN employee AS e ON e.manager_id = m.id`,
    roles_table: `SELECT * FROM role`,
    departments_table: `SELECT * FROM department`,
}


module.exports = { queries }