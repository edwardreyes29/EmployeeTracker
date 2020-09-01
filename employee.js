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

    // Get choice from user
    let menuChoice = await inquirer.prompt(menu_questions)
        .then(function (response) {
            return response.choice;
        })

    // Display all employees
    if (menuChoice === 'View All Employees') {
        let query =
            `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employee as e
            LEFT JOIN employee AS m ON e.manager_id = m.id
            INNER JOIN role ON e.role_id = role.id
            INNER JOIN department ON role.department_id = department.id
            ORDER BY e.id`

        displayTable(query);
    
    // Display employees by department
    } else if (menuChoice === 'View All Employees By Department') {
        let query =
            `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department
            FROM employee
            INNER JOIN role ON employee.role_id = role.id
            INNER JOIN department ON role.department_id = department.id
            ORDER BY employee.id`;

        displayTable(query);
    
    // Display employees by manager (if any)
    } else if (menuChoice === 'View All Employees By Manager') {
        let query =
            `SELECT e.id, e.last_name, CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employee AS e LEFT JOIN employee AS m ON e.manager_id = m.id`

        displayTable(query);

    // Adds employee to DB
    } else if (menuChoice === 'Add Employee') {

        // Get role titles and ids to store the in array for inquirer prompt
        let roleQuery =
            `SELECT id, title FROM role ORDER BY role.id;`
        let roleArray = [];
        let roleObject = {};
        await connection.query(roleQuery, function (err, data) {
            if (err) throw err;
            data.forEach(rowData => {
                roleObject[rowData.title] = rowData.id; // This is used to get the id of the role when query is sent
                roleArray.push(rowData.title);  // Store each role title in array to use for inquirer prompt
            })
        });

        // Get manager names and ids to store in array for inquirer prompt
        let managerQuery =
            `SELECT DISTINCT m.id, CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employee AS m JOIN employee AS e ON e.manager_id = m.id;`
        let managerArray = [];
        let managerObject = {};
        await connection.query(managerQuery, function (err, data) {
            if (err) throw err;
            data.forEach(rowData => {
                managerObject[rowData.manager] = rowData.id;
                managerArray.push(rowData.manager);
            });
        });

        // Add None key name and null value so user can choose to not add a manager for a particular employee.
        managerArray = managerArray.concat(["None"]);
        managerObject.None = null;

        // Create Prompt with updated roleArray and managerArray
        const add_employee_questions = [
            {
                type: "input",
                message: "Enter Employee's first name: ",
                name: "first_name"
            },
            {
                type: "input",
                message: "Enter Employee's last name: ",
                name: "last_name"
            },
            {
                type: "list",
                message: "What is the Employee's Role?",
                name: "role",
                choices: roleArray
            },
            {
                type: "list",
                message: "Who is the Employee's Manager?",
                name: "manager",
                choices: managerArray
            }
        ]
        await inquirer.prompt(add_employee_questions)
            .then(function (response) {
                let query = 
                    `INSERT INTO employee(first_name, last_name, role_id, manager_id)
                    VALUES("${response.first_name}", "${response.last_name}", ${roleObject[response.role]}, ${managerObject[response.manager]})`;
                sendQuery(query);
            });

    } else if (menuChoice === 'Remove Employee') {
        // Get role titles and ids to store the in array for inquirer prompt
        let employeeQuery =
            `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name
            FROM employee;`
        let employeeArray = [];
        let employeeObject = {};
        await connection.query(employeeQuery, function (err, data) {
            if (err) throw err;
            data.forEach(rowData => {
                employeeObject[rowData.name] = rowData.id; // This is used to get the id of the role when query is sent
                employeeArray.push(rowData.name);  // Store each role title in array to use for inquirer prompt
            });
        });

         // Create Prompt with updated roleArray and managerArray
        const remove_employee_questions = [
            {
                type: "list",
                message: "Which Employee do you want to remove?",
                name: "employee",
                choices: employeeArray
            }
        ];
        await inquirer.prompt(remove_employee_questions)
        .then(function (response) {
            let query = 
                `DELETE FROM employee WHERE id=${employeeObject[response.name]}`
            console.log(query)   
            // sendQuery(query);
        })


    } else if (menuChoice === 'Update Employee Role') {
        console.log('Update Employee Role')
    } else if (menuChoice === 'Update Employee Manager') {
        console.log('Update Employee Manager')
    } else if (menuChoice === 'View All Roles') {
        let query =
            `SELECT * FROM role`;

        displayTable(query);
    } else if (menuChoice === 'Add Role') {
        console.log('Add Role')
    } else if (menuChoice === 'Remove Role') {
        console.log('Remove Role')
    } else if (menuChoice === 'View All Departments') {
        let query =
            `SELECT * FROM department`;

        displayTable(query);
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

const displayTable = query => {
    connection.query(query, function (err, data) {
        if (err) throw err;
        const table = cTable.getTable(data);
        console.log('\n' + table + '\n');
    })
}
const sendQuery = query => {
    connection.query(query, function (err, data) {
        if (err) throw err;
    })
}
displayMenu();



