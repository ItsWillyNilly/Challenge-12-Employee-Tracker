-- -- departments
-- INSERT INTO
--     department (department_name)
-- VALUES
--     ("Sales"),
--     ("Engineering"),
--     ("Finance"),
--     ("Legal");

-- -- roles
-- INSERT INTO
--     role (title, salary, department_id)
-- VALUES
--     ("Sales Lead", 100000, 1),
--     ("Salesperson", 80000, 1),
--     ("Lead Engineer", 150000, 2),
--     ("Software Engineer", 120000, 2),
--     ("Account Manager", 160000, 3),
--     ("Accountant", 125000, 3),
--     ("Legal Team Lead", 250000, 4),
--     ("Lawyer", 190000, 4);

-- -- employees
-- INSERT INTO
--     employee (first_name, last_name, role_id, manager_id)
-- VALUES
--     ("John", "Doe", 1, NULL),
--     ("Mike", "Chan", 2, 1),
--     ("Ashley", "Rodriguez", 3, NULL),
--     ("Kevin", "Tupik", 4, 3),
--     ("Kunal", "Singh", 5, NULL),
--     ("Malia", "Brown", 6, 5),
--     ("Sarah", "Lourd", 7, NULL),
--     ("Tom", "Allen", 8, 7);
INSERT INTO department (department_name)
VALUES 
('Parks and Recreation'),
('Budget and Finance'),
('City Planning');


INSERT INTO role (title, salary, department_id)
VALUES 
('Director', 75000, 1),
('Deputy Director', 45000, 1),
('Assistant', 18000, 1),
('Head Auditor', 100000, 2),
('Accountant', 80000, 2),
('Engineer', 55000, 3),
('Miniature Horse', 0, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Ron', 'Swanson', 1, NULL),
('Leslie', 'Knope', 2, 1),
('April', 'Ludgate', 3, 2),
('Chris', 'Traeger', 4, NULL),
('Ben', 'Wyatt', 5, 4),
('Mark', 'Brendanawicz', 6, NULL),
('Lil', 'Sebastian', 7, NULL);