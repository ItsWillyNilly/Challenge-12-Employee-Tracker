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
        }
    });
}

function viewRoles() {

}

function viewEmployees() {

}

function addDepartment() {

}

function addRole() {

}

function addEmployee() {

}

function updateEmployee() {

}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

