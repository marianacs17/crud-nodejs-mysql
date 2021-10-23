-- creating the database
CREATE DATABASE school_db;

-- using the database
use school_db;

-- creating a table
CREATE TABLE students(
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    names VARCHAR(30) NOT NULL,
    lastname1 VARCHAR(20) NOT NULL,
    lastname2 VARCHAR(20) NULL,
    date_of_birth DATE NOT NULL,
    address VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    mothers_name VARCHAR(40) NULL,
    fathers_name VARCHAR(40) NULL,
    bloodtype VARCHAR(5) NOT NULL
);

CREATE TABLE teachers(
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    names VARCHAR(50) NOT NULL,
    lastname1 VARCHAR(20) NOT NULL,
    lastname2 VARCHAR(20) NULL,
    date_of_birth DATE NOT NULL,
    address VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    profession VARCHAR(50) NOT NULL,
    languages VARCHAR(40) NOT NULL,
    work_shift VARCHAR(30) NOT NULL
);

-- to show all tables
SHOW TABLES;

-- to describe tables
describe students;
describe teachers;