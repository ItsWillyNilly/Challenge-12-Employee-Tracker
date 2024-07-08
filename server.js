const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const { Pool } = require('pg');

app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

const pool = new Pool({
    user: '',
    host: 'localhost',
    database: 'employees_db',
    password: 'asdf',
    port: 3001,
});

pool.connect();

function startMenu() {
    inquirer.prompt([
        {
            name: "start",
            type: "list",
            message: "What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
        }
    ]).then(data => {
        if (data.start === "View all departments") {
            viewDepartments();
        } else if (data.start === "View all roles") {
            viewRoles();
        } else if (data.start === "View all employees") {
            viewEmployees();
        } else if (data.start === "Add a department") {
            addDepartment();
        } else if (data.start === "Add a role") {
            addRole();
        } else if (data.start === "Add an employee") {
            addEmployee();
        } else if (data.start === "Update an employee role") {
            updateEmployee();
        }
    });
}

function viewDepartments() {
    pool.query("SELECT * FROM department", (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
            startMenu();
        }
    });
}

function viewRoles() {
    pool.query("SELECT * FROM role", (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
            startMenu();
        }
    });
}

function viewEmployees() {
    pool.query("SELECT * FROM employee", (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
            startMenu();
        }
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What is the name of the department you would like to add?"
        }
    ]).then(data => {
        pool.query("INSERT INTO department (name) VALUES ($1)", [data.department], (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Department added successfully");
                startMenu();
            }
        })
    })
}

function addRole() {
    pool.query("SELECT name, id FROM department", (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        // gets all the department names and ids from the response and puts it into an array called departments
        const departments = res.map(({ name, id }) => ({ name, id }));

        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the name of the role you would like to add?"
            },

            {
                name: "salary",
                type: "input",
                message: "What is the salary for the role?"
            },

            {
                name: "department",
                type: "list",
                message: "What department would you like to add this role to?",
                choices: [...departments.map(({ name, id }) => ({ name, value: id }), { name: "Create a New Department", value: null })]
            }
        ]).then(answers => {
            const { title, salary, department } = answers;

            if (department === null) {
                inquirer.prompt([
                    {
                        name: "newDepartment",
                        type: "input",
                        message: "What is the name of the department you would like to create?"
                    }
                ]).then(newDepartmentAnswer => {
                    pool.query("INSERT INTO department (name) VALUES ($1)", [newDepartmentAnswer.newDepartment], (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const newDepartmentName = res.rows[0].id;
                            pool.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, newDepartmentName], (err, res) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("Role added successfully");
                                    startMenu();
                                }
                            })
                        }
                    })
                })
            } else {
                pool.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, department], (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Role added successfully");
                        startMenu();
                    }
                });
            }
        });
    });
}

function addEmployee() {
    pool.query("SELECT title, id FROM role", (err, roleRes) => {
        if (err) {
            console.log(err);
        } else {
            pool.query("SELECT name, id FROM employee", (err, managerRes) => {
                if (err) {
                    console.log(err);
                } else {
                    const roles = roleRes.map(({ title, id }) => ({ name: title, value: id }));
                    const managers = managerRes.map(({first_name, last_name, id})=> ({name: `${first_name}, ${last_name}`, value: id}));

                    // gets all the role titles and ids from the response and puts it into an array called roles
                    inquirer.prompt([
                        {
                            name: "firstName",
                            type: "input",
                            message: "What is the employees first name?"
                        },

                        {
                            name: "lastName",
                            type: "input",
                            message: "What is the employees last name?"
                        },

                        {
                            name: "role",
                            type: "list",
                            message: "What is the employees role?",
                            choices: [...roles]
                        },

                        {
                            name: "manager",
                            type: "list",
                            message: "Who is the manager for this employee?",
                            choices: [...managers, {name: "No Manager", value: null}]
                        }
                    ]).then(data => {
                        pool.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [data.firstName, data.lastName, data.role, data.manager], (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("Employee added successfully");
                                startMenu();
                            }
                        })
                    });
                }    
                
            });
        }
        
    });
}

function updateEmployee() {
    pool.query("SELECT id, first_name, last_name FROM employee", (err, employeeRes) => {
        if(err) {
            console.log(err);
        } else {
            const employees = employeeRes.map(({id, first_name, last_name}) => ({name: `${first_name} ${last_name}`, value: id}));

            inquirer.prompt([
                {
                    name: "employee",
                    type: "list",
                    message: "Which employee would you like to update?",
                    choices: [...employees]
                } 
            ]).then(employeeAnswer => {
                pool.query("SELECT id, title FROM role", (err, roleRes) => {
                    if(err) {
                        console.log(err);
                    } else {
                        const roles = rolesRes.map(({id, title}) => ({name: title, value: id}));

                        inquirer.prompt([
                            {
                                name: "role",
                                type: "list",
                                message: "What is the updated new role for the employee?",
                                choices: [...roles]
                            }
                        ]).then(roleAnswer => {
                            pool.query("UPDATE employee SET role_id = $1 WHERE id = $2", [roleAnswer.role, employeeAnswer.employee], (err, res) => {
                                if(err) {
                                    console.log(err);
                                } else {
                                    console.log("Employee role updated successfully");
                                    startMenu();
                                }
                            })
                        })
                    }
                })
            })
        }
    });
}

startMenu();

app.listen(PORT, () => {
    console.log(`You are now listening on (${PORT}) http://localhost:${PORT}.`);
});