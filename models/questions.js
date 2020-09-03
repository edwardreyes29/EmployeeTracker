const questions = {
    menu_questions: [{
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
    }],
    add_employee_questions: [
        {
            type: "input",
            message: "Enter First Name:",
            name: "first_name"
        },
        {
            type: "input",
            message: "Enter Last Name:",
            name: "last_name"
        },
        {
            type: "list",
            message: "Enter Role: ",
            name: "role",
            choices: []
        },
        {
            type: "list",
            message: "Enter Manager",
            name: "manager",
            choices: []
        }
    ],
    remove_employee_questions : [
        {
            type: "list",
            message: "Select Employee:",
            name: "employee",
            choices: []
        }
    ],
    update_employee_role_questions: [
        {
            type: "list",
            message: "Select Employee To Update",
            name: "employee",
            choices: []
        },
        {
            type: "list",
            message: "Enter New Role:",
            name: "role",
            choices: []
        }
        
    ],
    update_employee_manager_questions: [
        {
            type: "list",
            message: "Select Employee To Update:",
            name: "employee",
            choices: []
        },
        {
            type: "list",
            message: "Select New Manager:",
            name: "manager",
            choices: []
        }
    ],
    add_role_questions: [
        {
            type: "input",
            message: "Enter Role Title:",
            name: "title"
        },
        {
            type: "input", 
            message: "Enter Role's Salary:",
            name: "salary"
        },
        {
            type: "list",
            message: "Select Department:",
            name: "department",
            choices: []
        }
    ],
    remove_role_questions: [
        {
            type: "list",
            message: "Select Role:",
            name: "role",
            choices: []
        }
    ],
    add_department_questions: [
        {
            type: "input",
            message: "Enter Department Name:",
            name: "department"
        }
    ],
    remove_department_questions: [
        {
            type: "list",
            message: "Select Department:",
            name: "department",
            choices: []
        }
    ]
    
}

const generateMenuObject = questions => {
    let obj = {}
    for (let i = 0; i < questions[0].choices.length; i++) {
        obj[questions[0].choices[i]] = i;
    }
    return obj;
}

let menu_questions_obj = generateMenuObject(questions.menu_questions)


module.exports = { questions, menu_questions_obj }