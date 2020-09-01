var inquirer = require("inquirer");
var connection = require("./config/connection.js");
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
    while (menuChoice !== 'Quit' || menuChoice !== 'Return to Main Menu') {
        menuChoice = await inquirer.prompt(menu_questions)
        .then(function (response) {
            console.log(response);
            return response.choice;
        }) 
        if (menuChoice === 'View All Employees') {
            console.log('View All Employees')
        } else if (menuChoice === 'View All Employees By Department') {
            console.log('View All Employees By Department')
        } else if (menuChoice === 'View All Employees By Manager') {
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
        }
    }
}
displayMenu();