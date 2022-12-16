CREATE DATABASE clubs_itesi;
USE clubs_itesi;

-- Tablas para la administración del sistema de clubs

CREATE TABLE roles (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
);

CREATE TABLE usuarios (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  correo VARCHAR(50) NOT NULL,
  contraseña VARCHAR(50) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_rol INT NOT NULL,
);


-- Tablas para la administración de clubs

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
  id_categoria_club INT NOT NULL,
);

CREATE TABLE archivos_plan_anual_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  ruta VARCHAR(50) NOT NULL,
  id_club INT NOT NULL,
);

CREATE TABLE archivos_acta_constitutiva_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  ruta VARCHAR(50) NOT NULL,
  id_club INT NOT NULL,
);

CREATE TABLE especialidad_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
);

CREATE TABLE categoria_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
);

CREATE TABLE plantel (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
);

-- Tablas para la administración de miembros

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
  id_club INT NOT NULL,
);

CREATE TABLE especialidad_miebro (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(50) NOT NULL,
);

CREATE TABLE rol_miembro_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(50) NOT NULL,
);


-- Tablas para la administración de actividades


