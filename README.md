# Challenge-12-Employee-Tracker
This is an exployee tracker application that utilizes Express.js, File System(fs) node module, Postgres and databases.

## Description
This is an employee tracker that lets users view and manage an employee's role, salary and department. This program ustilizes a SQL database to store information. When the program is run, the user is prompted with a menu where they can select to view employees, update an employee, and add a role, employee or department.

## User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Technologies Used
**Node.js** <br>
**fs**<br>
**Express.js**<br>
**Insomnia**<br>
**inquirer**<br>
**SQL**

## Installation Instructions
**Clone the repository**
```bash
git clone git@github.com:ItsWillyNilly/Challenge-12-Employee-Tracker.git
```

**Navigate to the project directory**
<br>EXAMPLE:
```
cd /Users/williamlee/bootcamp/challenge-12/Challenge-12-Employee-Tracker
```
**Install the Node package**
```bash
npm init -y
```

**Install dependencies**
```bash
npm i express
```
```bash
npm i uniqid
```
```bash
npm i inquirer
```

**Run the program**
```bash
node server.js
```

## Program Demonstration
<img src="assets/videos/Untitled Video September 16, 2024 11_41 AM.gif">
Video Link:<br> https://drive.google.com/file/d/1QRB1vJz5t3nrcLpD0sMw_V6gXRununMH/view?usp=sharing

## GitHub Repo Link
https://github.com/ItsWillyNilly/Challenge-12-Employee-Tracker