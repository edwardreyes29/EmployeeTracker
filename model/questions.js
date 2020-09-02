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

const add_employee_questions = [
    {
        type: "input",
        message: "Enter employee's first name: ",
        name: "first_name"
    },
    {
        type: "input",
        message: "Enter employee's last name: ",
        name: "last_name"
    },
    {
        type: "list",
        message: "What is the employee's role?",
        name: "role",
        choices: []
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        name: "manager",
        choices: []
    }
]

const update_employee_role_questions = [
    {
        type: "list",
        message: "What is the name of the employee whose role you want to change?",
        name: "employee",
        choices: []
    },
    {
        type: "list",
        message: "What is the employee's new role?",
        name: "role",
        choices: []
    }
    
]

const getMenuQuestion = questions => {
    let obj = {}
    for (let i = 0; i < questions[0].choices.length; i++) {
        obj[questions[0].choices[i]] = i;
    }
    return obj;
}

menu_question_obj = getMenuQuestion(menu_questions)


module.exports = {
    menu_questions,
    menu_question_obj,
    add_employee_questions,
    update_employee_role_questions
}