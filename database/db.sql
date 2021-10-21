-- creating the database
CREATE DATABASE escuela_db;

-- using the database
use escuela_db;

-- creating a table
CREATE TABLE alumnos(
    id_alumno INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(30) NOT NULL,
    apellido_1 VARCHAR(20) NOT NULL,
    apellido_2 VARCHAR(20) NULL,
    fecha_nacimiento DATE NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    numero_telefonico VARCHAR(15) NOT NULL,
    nombre_madre VARCHAR(40) NULL,
    nombre_padre VARCHAR(40) NULL,
    tipo_de_sangre VARCHAR(5) NOT NULL
);

CREATE TABLE profesores(
    id_profesor INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(50) NOT NULL,
    apellido_1 VARCHAR(20) NOT NULL,
    apellido_2 VARCHAR(20) NULL,
    fecha_nacimiento DATE NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    correo_electronico VARCHAR(50) NOT NULL,
    profesion VARCHAR(50) NOT NULL,
    idiomas VARCHAR(40) NOT NULL,
    turno VARCHAR(30) NOT NULL
);

-- to show all tables
SHOW TABLES;

-- to describe tables
describe alumnos;
describe profesores;