DROP DATABASE IF EXISTS employees_db;
-- Creates the "employee_db" database 
CREATE DATABASE employees_db;

-- makes it so all of the following code will affect employee_db 
\c employees_db;

-- creates a table called "employee" within employees_db 
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT
);

-- creates a table called "role" within employees_db
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL
);

-- creates a table called "department" within employees_db
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);