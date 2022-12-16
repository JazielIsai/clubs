CREATE DATABASE clubs_itesi;
USE clubs_itesi;

-- Tablas para la administración del sistema de clubs

CREATE TABLE roles (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
);

INSERT INTO roles (nombre)
VALUES ('Administrador'), ('Presidente'), ('Consulta');

CREATE TABLE usuarios (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  correo VARCHAR(50) NOT NULL,
  contraseña VARCHAR(50) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_rol INT NOT NULL
);

INSERT INTO usuarios (nombre, correo, contraseña, id_rol)
VALUES ('Oscar', 'oscar@gmail.com', '12345678', 1),
       ('Mariana', 'mariana@gmail.com', '123456', 2),
       ('Jaziel', 'isai@gmail.com', '123456', 3);

-- Tablas para la administración de clubs

CREATE TABLE especialidad_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
);

INSERT INTO especialidad_club (nombre)
VALUES ('Tecnm'), ('Robotica'), ('Astronomia'), ('Girl Up'), ('Astrología');

CREATE TABLE categoria_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
);

INSERT INTO categoria_club (nombre)
VALUES ('Ciencia y Tecnología'), ('Desarrollo Humano'), ('Deporte'), ('Arte'), ('Cultura');

CREATE TABLE plantel (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
);

INSERT INTO plantel(nombre)
VALUES ('Instituto Tecnológico Superior De Irapuato');

CREATE TABLE clubes (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  objetivo TEXT NOT NULL,
  logo VARCHAR(100) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   plan_anual VARCHAR(50),
--   acta_constitutiva VARCHAR(50),
  estatus VARCHAR(50) NOT NULL,
  id_plantel INT NOT NULL,
  id_especialidad INT NOT NULL,
  id_categoria_club INT NOT NULL
);

INSERT INTO clubes (name, objetivo, logo, estatus, id_plantel, id_especialidad, id_categoria_club)
VALUES ('Ajedrez', 'Jugar y ganar para la representación del itesi', 'logo', 'activo', 1, 1, 3),
       ('Astrología', 'Estudiar y aprender acerca de los astros y demás en el itesi', 'logo', 'activo', 1, 5, 1),
       ('Robotonicos', 'Realización de robots y maquinas para la automatización en la industraia', 'logo', 'activo', 1, 2, 1);


CREATE TABLE archivos_plan_anual_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  ruta VARCHAR(50) NOT NULL,
  id_club INT NOT NULL
);

CREATE TABLE archivos_acta_constitutiva_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  ruta VARCHAR(50) NOT NULL,
  id_club INT NOT NULL
);

-- Tablas para la administración de miembros

CREATE TABLE especialidad_miebro (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
);

DROP TABLE especialidad_miebro;

CREATE TABLE rol_miembro_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
);

DROP TABLE rol_miembro_club;

INSERT INTO rol_miembro_club (nombre)
VALUES ('Presidente'), ('Secretario'), ('Tesorero'), ('Vocal'), ('Vocal'), ('Miembro'), ('Asistente'), ('Asesor Interno'), ('Asesor Externo');

CREATE TABLE miembros_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  no_control VARCHAR(50),
  nombre VARCHAR(50) NOT NULL,
  apellido_paterno VARCHAR(50) NOT NULL,
  apellido_materno VARCHAR(50) NOT NULL,
  sexo VARCHAR(50) NOT NULL,
  correo VARCHAR(50) NOT NULL,
  telefono VARCHAR(50) NOT NULL,
  rango VARCHAR(50),
  semestre VARCHAR(50) NOT NULL,
  id_especialidad INT NOT NULL,
  id_rol_member_club INT NOT NULL,
  id_club INT NOT NULL
);


INSERT INTO miembros_club (no_control, nombre, apellido_paterno, apellido_materno,
                           sexo, correo, telefono, rango, semestre, id_especialidad,
                           id_rol_member_club, id_club)
VALUES ('LIS190012', 'Hiram Isai', 'Vera', 'Garrido', 'Masculino', 'hiram@gmail.com', '432212345', 'ninguno', '3', 1, 1, 1),
       ('LIS190012', 'Hiram Isai', 'Vera', 'Garrido', 'Masculino', 'hiram@gmail.com', '432212345', 'ninguno', '3', 1, 1, 1);


-- Tablas para la administración de actividades

CREATE TABLE `actividad`(
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `modalidad` varchar(50) NOT NULL,
  `fecha` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `objetivo_desarrollo_s` text ,
  `atributo_egreso` varchar(250) ,
  `calificacion_valor` INT NOT NULL,
  `tipo_evidencia` varchar(50) NOT NULL,
  `responsable` varchar(50) NOT NULL,
  `observaciones` TEXT,
  `estatus` varchar(20) NOT NULL,
  `modelo` varchar(20) ,
  `dominio` varchar(20) NOT NULL,
  `id_habilidad_desarrollada` INT NOT NULL,
  `id_tipo_actividad` INT NOT NULL,
  `id_club` INT NOT NULL,
  `id_idioma` INT NOT NULL
);

CREATE TABLE `habilidades`(
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `nombre` varchar(50) NOT NULL
);

CREATE TABLE `tipo_actividad`(
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `nombre` varchar(50) NOT NULL
);

CREATE TABLE `evidencia`(
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `ruta` varchar(200) NOT NULL,
  `id_actividad` int NOT NULL
);

CREATE TABLE `idioma`(
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `idioma` varchar(20) NOT NULL
);

CREATE TABLE `incidencias`(
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `motivo` varchar(250) NOT NULL,
  `fecha` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `id_actividad` int NOT NULL
);