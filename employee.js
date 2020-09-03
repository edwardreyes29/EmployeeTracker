const inquirer = require("inquirer");
const connection = require("./config/connection.js");
const cTable = require("console.table");
let { questions, menu_questions_obj } = require("./model/questions.js")
let { queries } = require("./model/queries.js");

const displayMenu = () => {
    // Get choice from user
    inquirer.prompt(questions.menu_questions).then(function (response) {
        // get number based on choice
        let menuChoiceNum = menu_questions_obj[response.choice];
        switch (menuChoiceNum) {
            case 0: // Display all employees
                displayTable(queries.all_employees);
                break;
            case 1: // Display employees by department
                displayTable(queries.employees_department);
                break;
            case 2: // Display employees by manager (if any)
                displayTable(queries.employees_manager);
                break;
            case 3:  // Adds employee to DB
                // let query4 = queries[menuChoiceNum];
                addEmployee();
                break;
            case 4: // Remove employee
                removeEmployee();
                break;
            case 5: // Update Employee Role
                break;
            case 6: // Update Employee Manager
                break;
            case 7: // View All Roles
                break;
            case 8: // Add Role
                break;
            case 9: // Remove Role
                break;
            case 10: // View All Departments
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
    })
}
displayMenu();

// This function returns results from query
const getQueryResults = query => {
    return new Promise((resolve, reject) => {
        connection.query(query, function (err, data) {
            if (err) {
                reject('Query Error');
            } else {
                resolve(data);
            }
        });
    });
}

// This function sends a query
const sendQuery = query => {
    connection.query(query, function (err, data) {
        if (err) throw err;
    })
}

// This functions gets a query and displays it as a table.
const displayTable = async query => {
    try {
        const data = await getQueryResults(query);
        const table = cTable.getTable(data);
        console.log('\n' + table + '\n');
        displayMenu();
    } catch (err) {
        console.log(err);
        displayMenu();
    }
}

// Add an employee to DB
const addEmployee = async () => {
    try {
        // Get roles and manger names
        const rolesData = await getQueryResults(queries.roles_title_id);
        const employeeData = await getQueryResults(queries.employee_names_id);

        // Convert roles data to an object and array
        let rolesArray = [];
        let rolesObject = {};
        rolesData.forEach(data => {
            rolesArray.push(data.title);
            rolesObject[data.title] = data.id;
        });

        // Convert employee data to an object and array
        let employeesArray = [];
        let employeesObject = {};
        employeeData.forEach(data => {
            employeesArray.push(data.name);
            employeesObject[data.name] = data.id;
        });

        // Add None key name and null value to both manager objects
        employeesArray = employeesArray.concat(["None"]);
        employeesObject.None = null;

        // Add arrays to questions choices for inquirer prompt
        let add_employee_questions = questions.add_employee_questions;
        add_employee_questions[2].choices = rolesArray;
        add_employee_questions[3].choices = employeesArray;

        await inquirer.prompt(add_employee_questions).then(function (response) {
            let addQuery =
                `INSERT INTO employee(first_name, last_name, role_id, manager_id)
                VALUES("${response.first_name}", "${response.last_name}", ${rolesObject[response.role]}, ${employeesObject[response.manager]})`;
            sendQuery(addQuery);
        });
        displayMenu();
    } catch (err) {
        console.log(err);
        displayMenu();
    }
}

// Remove an employee from DB and sets null to any manager_id of the removed employee
const removeEmployee = async () => {
    try {
        const employeeData = await getQueryResults(queries.employee_names_id);

        // Convert employee data to an object and array
        let employeesArray = [];
        let employeesObject = {};
        employeeData.forEach(data => {
            employeesArray.push(data.name);
            employeesObject[data.name] = data.id;
        });

        let remove_employee_questions = questions.remove_employee_questions;
        remove_employee_questions[0].choices = employeesArray;

        await inquirer.prompt(remove_employee_questions).then(function (response) {
            // Sets manager ids of other employees to null whose manager id's match the employees id to be removed
            let updateQuery = `UPDATE employee SET manager_id = null WHERE manager_id = ${employeesObject[response.employee]}`;
            sendQuery(updateQuery);

            let deleteQuery = `DELETE FROM employee WHERE id=${employeesObject[response.employee]}`;
            sendQuery(deleteQuery);
            console.log("Success!!!");
        });
        displayMenu();
    } catch (err) {
        console.log(err);
        displayMenu();
    }
}