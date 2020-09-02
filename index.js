const inquirer = require("inquirer");
const connection = require("./config/connection.js");
const cTable = require("console.table");

let { menu_questions, menu_question_obj, add_employee_questions } = require("./model/questions.js")
let { queries } = require("./model/queries.js")

async function displayMenu() {
    // Get choice from user
    let menuChoice = await inquirer.prompt(menu_questions)
        .then(function (response) {
            return response.choice;
        })

    // console.log(menu_question_obj[menuChoice]);
    let menuChoiceNum = menu_question_obj[menuChoice];
    switch (menuChoiceNum) {
        case 0: // Display all employees
            let title1 = "Employees:\n==========";
            let query1 = queries[menuChoiceNum];
            displayTable(title1, query1);
            break;
        case 1: // Display employees by department
            let title2 = "Employee by department:\n=======================";
            let query2 = queries[menuChoiceNum]
            displayTable(title2, query2);
            break;
        case 2: // Display employees by manager (if any)
            let title3 = "Employee by manager:\n====================";
            let query3 = queries[menuChoiceNum]
            displayTable(title3, query3);
            break;
        case 3:  // Adds employee to DB
            let query4 = queries[menuChoiceNum];
            await addEmployee(query4);
            break;
        case 4: // Remove employee
            let query5 = queries[menuChoiceNum];
            await removeEmployee(query5);
            break;
        case 5: // Update Employee Role
            break;
        case 6: // Update Employee Manager
            break;
        case 7: // View All Roles
            let title7 = "Roles:\n======"
            let query7 =
            `SELECT * FROM role`;
            displayTable(title7, query7);
            break;
        case 8: // Add Role
            break;
        case 9: // Remove Role
            break;
        case 10: // View All Departments
            let title10 = "Departments:\n============"
            let query10 =
            `SELECT * FROM department`;
            displayTable(title10, query10);
            break;
        case 11: // View Total Utilized Department Budget
            break;
        case 12: // Add Department
            break; 
        case 13: // Remove Department
            break;
        case 14:    // Quit
            connection.end();
            return;
    }
    await displayMenu();
}
displayMenu();

const displayTable = (title, query) => {
    connection.query(query, function (err, data) {
        if (err) throw err;
        const table = cTable.getTable(data);
        console.log('\n\n' + title + '\n')
        console.log(table + '\n');
    })
}
const sendQuery = query => {
    connection.query(query, function (err, data) {
        if (err) throw err;
    })
}

async function addEmployee(queries) {
    // Get role titles and ids to store the in array for inquirer prompt
    let roleQuery = queries[0];
    let roleArray = [];
    let roleObject = {};
    connection.query(roleQuery, function (err, data) {
        if (err) throw err;
        data.forEach(rowData => {
            roleObject[rowData.title] = rowData.id; // This is used to get the id of the role when query is sent
            roleArray.push(rowData.title);  // Store each role title in array to use for inquirer prompt
        });
    });

    // Get manager names and ids to store in array for inquirer prompt
    let managerQuery = queries[1];
    let managerArray = [];
    let managerObject = {};
    connection.query(managerQuery, function (err, data) {
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
    add_employee_questions[2].choices = roleArray;
    add_employee_questions[3].choices = managerArray;
    // console.log(add_employee_questions)

    await inquirer.prompt(add_employee_questions)
        .then(function (response) {
            let query =
                `INSERT INTO employee(first_name, last_name, role_id, manager_id)
                VALUES("${response.first_name}", "${response.last_name}", ${roleObject[response.role]}, ${managerObject[response.manager]})`;
            sendQuery(query);
        });
}

async function removeEmployee(query) {
    // Get role titles and ids to store the in array for inquirer prompt
    let employeeQuery = query;
    let employeeArray = [];
    let employeeObject = {};
    let remove_employee_questions = [];
    connection.query(employeeQuery, function (err, data) {
        if (err) throw err;
        data.forEach(rowData => {
            employeeObject[rowData.name] = rowData.id; // This is used to get the id of the role when query is sent
            employeeArray.push(rowData.name);  // Store each role title in array to use for inquirer prompt
        });
        remove_employee_questions = [
            {
                type: "list",
                message: "Which Employee do you want to remove?",
                name: "employee",
                choices: employeeArray
            }
        ];
        inquirer.prompt(remove_employee_questions)
            .then(function (response) {
                let query =
                    `DELETE FROM employee WHERE id=${employeeObject[response.employee]}`
                sendQuery(query);
            })
    });
}


