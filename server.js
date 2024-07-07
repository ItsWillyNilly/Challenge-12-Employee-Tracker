const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const {Pool} = require('pg');

app = express();

const PORT = process.env.PORT || 3001;

const pool = new Pool({
    user: '',
    host: 'localhost',
    database: 'employees_db',
    password: 'asdf',
    port: 3001,
});

function startMenu() {
    inquirer.prompt([
        {
            name: "start",
            type: "list",
            message: "What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee",  "Update an employee role"]
        }
    ]).then(data) {
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
    }
}

function viewDepartments() {
    pool.query("SELECT * FROM department", (err, res) => {
        if(err){
            console.log(err);
        } else {
            console.table(res);
            startMenu();
        }
    });
}

function viewRoles() {
    pool.query("SELECT * FROM role", (err, res) => {
        if(err){
            console.log(err);
        } else {
            console.table(res);
            startMenu();
        }
    });
}

function viewEmployees() {
    pool.query("SELECT * FROM employee", (err, res) => {
        if(err){
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
    ]) .then(data => {
            pool.query("INSERT INTO department (name) VALUES (?)", [data.department], (err, res) => {
                if(err){
                    console.log(err);
                } else {
                    console.log("Department added successfully");
                    startMenu();
                }
            })
    })
}

function addRole() {
    pool.query("SELECT name FROM department", (err, res) => {
        if(err){
            console.log(err);
            return;
        }

    // gets all the department names from the response and puts it into an array called departments
        const departments = res.map(({name}) => name);

        inquirer.prompt ([
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
                choices: [departments, "Create a New Department"]
            }
        ]).then(answers => {
            const {title, salary, department} = answers;
            
            if(department === "Create a New Department") {
                inquirer.prompt([
                    {
                        name: "newDepartment",
                        type: "input",
                        message: "What is the name of the department you would like to create?"
                    }
                ]).then(newDepartmentAnswer => {
                    pool.query("INSERT INTO department (name) VALUES (?)", [newDepartmentAnswer.newDepartment], (err, res) => {
                        if(err) {
                            console.log(err);
                        } else {
                            const newDepartmentName = res.rows[0].name;
                            pool.query("INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)", [title, salary, newDepartmentName], (err, res) => {
                                if(err) {
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
                pool.query("INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)", [title, salary, department], (err, res) => {
                    if(err) {
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

}

function updateEmployee() {

}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

