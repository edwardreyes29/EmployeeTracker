const inquirer = require("inquirer");
const connection = require("./config/connection.js");
const cTable = require("console.table");
let { questions, menu_questions_obj } = require("./models/questions.js")
let { queries } = require("./models/queries.js");

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
                updateEmployeeRole();
                break;
            case 6: // Update Employee Manager
                updateEmployeeManager();
                break;
            case 7: // View All Roles
                displayTable(queries.roles_table);
                break;
            case 8: // Add Role
                addRole();
                break;
            case 9: // Remove Role
                removeRole();
                break;
            case 10: // View All Departments
                displayTable(queries.departments_table);
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

/*========== Reusable functions ==========*/
// This function sends a query
const sendQuery = query => {
    connection.query(query, function (err, data) {
        if (err) {
            console.log(err);
        }
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

const generateDataArray = (data, property) => {
    let array = [];
    data.forEach(data => {
        array.push(data[property]);
    });
    return array;
}

const generateDataObject = (data, property) => {
    let obj = {};
    data.forEach(data => {
        obj[data[property]] = data.id;
    })
    return obj;
}


/*========== Employee DB functions ==========*/
// Add an employee to DB
const addEmployee = async () => {
    try {
        // Get roles and manger names
        const rolesData = await getQueryResults(queries.roles_title_id);
        const employeeData = await getQueryResults(queries.employee_names_id);

        // Convert roles data to an object and array
        let rolesArray = generateDataArray(rolesData, 'title');
        let rolesObject = generateDataObject(rolesData, 'title');

        // Convert employee data to an object and array
        let employeesArray = generateDataArray(employeeData, 'name');
        let employeesObject = generateDataObject(employeeData, 'name');

        // Add None key name and null value to both manager objects
        employeesArray = employeesArray.concat(["None"]);
        employeesObject.None = null;

        // Add arrays to questions choices for inquirer prompt
        let add_employee_questions = questions.add_employee_questions;
        add_employee_questions[2].choices = rolesArray;
        add_employee_questions[3].choices = employeesArray;

        await inquirer.prompt(add_employee_questions).then(function (response) {
            let addQuery = `INSERT INTO employee(first_name, last_name, role_id, manager_id) ` +
                `VALUES("${response.first_name}", "${response.last_name}", ${rolesObject[response.role]}, ${employeesObject[response.manager]})`;
            sendQuery(addQuery);
        });
        console.log("\nEmployee Added\n");
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
        let employeesArray = generateDataArray(employeeData, 'name');
        let employeesObject = generateDataObject(employeeData, 'name');

        let remove_employee_questions = questions.remove_employee_questions;
        remove_employee_questions[0].choices = employeesArray;

        await inquirer.prompt(remove_employee_questions).then(function (response) {
            // Sets manager ids of other employees to null whose manager id's match the employees id to be removed
            let updateQuery = `UPDATE employee SET manager_id = null WHERE manager_id = ${employeesObject[response.employee]}`;
            sendQuery(updateQuery);

            let deleteQuery = `DELETE FROM employee WHERE id=${employeesObject[response.employee]}`;
            sendQuery(deleteQuery);
        });
        console.log("\nEmployee Removed\n");
        displayMenu();
    } catch (err) {
        console.log(err);
        displayMenu();
    }
}

// Updates employee's role
const updateEmployeeRole = async () => {
    try {
        // Get roles and manger names
        const rolesData = await getQueryResults(queries.roles_title_id);
        const employeeData = await getQueryResults(queries.employee_names_id);

        // Convert roles data to an object and array
        let rolesArray = generateDataArray(rolesData, 'title');
        let rolesObject = generateDataObject(rolesData, 'title');

        // Convert employee data to an object and array
        let employeesArray = generateDataArray(employeeData, 'name');
        let employeesObject = generateDataObject(employeeData, 'name');

        // Add new arrays to the inquirer question choices.
        let update_employee_role_questions = questions.update_employee_role_questions;
        update_employee_role_questions[0].choices = employeesArray;
        update_employee_role_questions[1].choices = rolesArray;

        await inquirer.prompt(update_employee_role_questions).then(function (response) {
            let updateRoleQuery = `UPDATE employee SET role_id = ${rolesObject[response.role]} WHERE id = ${employeesObject[response.employee]}`;
            sendQuery(updateRoleQuery);
        });
        console.log("\nEmployee Role Updated\n");
        displayMenu();

    } catch (err) {
        console.log(err);
        displayMenu();
    }
}

// Update employee's manager
const updateEmployeeManager = async () => {
    try {
        const employeeData = await getQueryResults(queries.employee_names_id);

        // Convert employee data to an object and array
        let employeesArray = generateDataArray(employeeData, 'name');
        let employeesObject = generateDataObject(employeeData, 'name');

        let update_employee_manager_questions = questions.update_employee_manager_questions;
        update_employee_manager_questions[0].choices = employeesArray;
        update_employee_manager_questions[1].choices = employeesArray;

        await inquirer.prompt(update_employee_manager_questions).then(function (response) {
            let updateManagerQuery = `UPDATE employee SET manager_id = ${employeesObject[response.manager]} WHERE id = ${employeesObject[response.employee]};`
            sendQuery(updateManagerQuery);
        });
        console.log("\nEmployee Manager Updated\n");
        displayMenu();
    } catch (err) {
        console.log(err);
        displayMenu();
    }
}

// Add new Role
const addRole = async () => {
    try {
        const departmentData = await getQueryResults(queries.departments_table);

        // Convert department data to an object and array
        let departmentsArray = generateDataArray(departmentData, 'name');
        let departmentsObject = generateDataObject(departmentData, 'name');

        let add_role_questions = questions.add_role_questions;
        add_role_questions[2].choices = departmentsArray;

        await inquirer.prompt(add_role_questions).then(function (response) {
            let addRoleQuery = `INSERT INTO role (title, salary, department_id) ` +
                                `VALUES("${response.title}", ${response.salary}, ${departmentsObject[response.department]})`;
            sendQuery(addRoleQuery);
        });
        console.log("\nRole Added\n");
        displayMenu();
    } catch (err) {
        console.log(err);
        displayMenu();
    }
}

// Remove Role
// DELETE FROM role WHERE id = 8;
const removeRole = async () => {
    try {
        const rolesData = await getQueryResults(queries.roles_title_id);

        let rolesArray = generateDataArray(rolesData, 'title');
        let rolesObject = generateDataObject(rolesData, 'title');

        let remove_role_questions = questions.remove_role_questions;
        remove_role_questions[0].choices = rolesArray;

        await inquirer.prompt(remove_role_questions).then(function (response) {
            let removeRoleQuery = `DELETE FROM role WHERE id = ${rolesObject[response.role]}`
            sendQuery(removeRoleQuery);
        });
        console.log("\nRole Removed\n");
        displayMenu();

    } catch (err) {
        console.log(err);
        displayMenu();
    }
}