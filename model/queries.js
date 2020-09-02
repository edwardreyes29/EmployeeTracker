const queries = [
    `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager ` +
        `FROM employee as e ` +
        `LEFT JOIN employee AS m ON e.manager_id = m.id ` +
        `INNER JOIN role ON e.role_id = role.id ` +
        `INNER JOIN department ON role.department_id = department.id ` +
        `ORDER BY e.id`,

    `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department ` +
        `FROM employee ` +
        `INNER JOIN role ON employee.role_id = role.id ` +
        `INNER JOIN department ON role.department_id = department.id ` +
        `ORDER BY employee.id`,

    `SELECT e.id, e.last_name, CONCAT(m.first_name, ' ', m.last_name) AS manager ` +
        `FROM employee AS e LEFT JOIN employee AS m ON e.manager_id = m.id`,
    [`SELECT id, title FROM role ORDER BY role.id`, `SELECT DISTINCT m.id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee AS m JOIN employee AS e ON e.manager_id = m.id;`],
    `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name FROM employee`
]

module.exports = {
    queries
}