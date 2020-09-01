var inquirer = require("inquirer");
var connection = require("./config/connection.js");
const cTable = require('console.table');

const menu_questions = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
            'View All Employees',
            'View All Employees By Department',
            'View All Employees By Manager',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'View All Roles',
            'Add Role',
            'Remove Role',
            'View All Departments',
            'View Total Utilized Department Budget',
            'Add Department',
            'Remove Department',
            'Quit'
        ]
    }
];
async function displayMenu() {
    let menuChoice;
    menuChoice = await inquirer.prompt(menu_questions)
        .then(function (response) {
            return response.choice;
        })
    if (menuChoice === 'View All Employees') {
        let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager " +
        "FROM employee as e " + 
        "LEFT JOIN employee AS m ON e.manager_id = m.id " +
        "INNER JOIN role ON e.role_id = role.id " + 
        "INNER JOIN department ON role.department_id = department.id " +
        "ORDER BY e.id";
        getQuery(query);
    } else if (menuChoice === 'View All Employees By Department') {
        let query = "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department " +
        "FROM employee " +
        "INNER JOIN role ON employee.role_id = role.id " +
        "INNER JOIN department ON role.department_id = department.id " +
        "ORDER BY employee.id"; 
        getQuery(query);
        console.log('View All Employees By Department');
    } else if (menuChoice === 'View All Employees By Manager') {
        let query = "SELECT e.id, e.last_name, CONCAT(m.first_name, ' ', m.last_name) AS manager " + 
        "FROM employee AS e LEFT JOIN employee AS m ON e.manager_id = m.id"
        getQuery(query);
        console.log('View All Employees By Manager')
    } else if (menuChoice === 'Add Employee') {
        console.log('Add Employee')
    } else if (menuChoice === 'Remove Employee') {
        console.log('Remove Employee')
    } else if (menuChoice === 'Update Employee Role') {
        console.log('Update Employee Role')
    } else if (menuChoice === 'Update Employee Manager') {
        console.log('Update Employee Manager')
    } else if (menuChoice === 'View All Roles') {
        console.log('View All Roles')
    } else if (menuChoice === 'Add Role') {
        console.log('Add Role')
    } else if (menuChoice === 'Remove Role') {
        console.log('Remove Role')
    } else if (menuChoice === 'View All Departments') {
        console.log('View All Departments')
    } else if (menuChoice === 'View Total Utilized Department Budget') {
        console.log('View Total Utilized Department Budget')
    } else if (menuChoice === 'Add Department') {
        console.log('Add Department')
    } else if (menuChoice === 'Remove Department') {
        console.log('Remove Department')
    } else if (menuChoice === 'Quit') {
        connection.end();
        return;
    }
    displayMenu();
}

const getQuery = query => {
    console.log(query);
    connection.query(query, function (err, data) {
        if (err) throw err;
        // console.log(data);
        const table = cTable.getTable(data);
        console.log('\n' + table);
    })
}
displayMenu();