CREATE DATABASE clubs_itesi;
USE clubs_itesi;

-- Tablas para la administración del sistema de clubs

CREATE TABLE roles (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO roles (nombre)
VALUES ('Administrador'), ('Presidente'), ('Consulta');

CREATE TABLE usuarios (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  correo VARCHAR(50) NOT NULL,
  contraseña VARCHAR(50) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_rol INT NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO usuarios (nombre, correo, contraseña, id_rol)
VALUES ('Oscar', 'oscar@gmail.com', '12345678', 1),
       ('Mariana', 'mariana@gmail.com', '123456', 2),
       ('Jaziel', 'isai@gmail.com', '123456', 3);

SELECT usuarios.id, usuarios.nombre, usuarios.correo, usuarios.fecha_creacion,
       roles.nombre as rol_usuario
FROM usuarios
INNER JOIN roles ON usuarios.id_rol = roles.id;

-- Tablas para la administración de clubs

CREATE TABLE especialidad_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO especialidad_club (nombre)
VALUES ('Tecnm'), ('Robotica'), ('Astronomia'), ('Girl Up'), ('Astrología');

CREATE TABLE categoria_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO categoria_club (nombre)
VALUES ('Ciencia y Tecnología'), ('Desarrollo Humano'), ('Deporte'), ('Arte'), ('Cultura');

CREATE TABLE plantel (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO plantel (nombre) VALUES
('IRAPUATO'),
('CUERAMARO'),
('SAN FELIPE'),
('SAN JOSE ITURBIDE'),
('SAN LUIS DE LA PAZ'),
('TARIMORO');


CREATE TABLE clubes (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  objetivo TEXT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   plan_anual VARCHAR(50),
--   acta_constitutiva VARCHAR(50),
  estatus VARCHAR(50) NOT NULL,
  id_plantel INT NOT NULL,
  id_especialidad INT NOT NULL,
  id_categoria_club INT NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO clubes (name, objetivo, estatus, id_plantel, id_especialidad, id_categoria_club)
VALUES ('Ajedrez', 'Jugar y ganar para la representación del itesi', 'activo', 1, 1, 3),
       ('Astrología', 'Estudiar y aprender acerca de los astros y demás en el itesi', 'activo', 1, 5, 1),
       ('Robotonicos', 'Realización de robots y maquinas para la automatización en la industraia', 'activo', 1, 2, 1);

SELECT clubes.id, clubes.name, clubes.objetivo, clubes.fecha_creacion, clubes.estatus,
       plantel.nombre AS plantel, especialidad_club.nombre AS especialidad_club,
       categoria_club.nombre AS categoria_club
FROM clubes
INNER JOIN plantel ON clubes.id_plantel = plantel.id
INNER JOIN especialidad_club ON clubes.id_especialidad = especialidad_club.id
INNER JOIN categoria_club ON clubes.id_categoria_club = categoria_club.id
WHERE clubes.id = 1;

CREATE TABLE logo_clubs (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    ruta VARCHAR(100) NOT NULL,
    id_club INT NOT NULL
);

CREATE TABLE archivos_plan_anual_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  ruta VARCHAR(50) NOT NULL,
  id_club INT NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE archivos_acta_constitutiva_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  ruta VARCHAR(50) NOT NULL,
  id_club INT NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tablas para la administración de miembros

CREATE TABLE especialidad_miebro (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO especialidad_miebro (nombre) VALUES
('LICENCIATURA EN INFORMÁTICA'),
('INGENIERÍA EN SISTEMAS COMPUTACIONALES'),
('INGENIERÍA ELECTROMECÁNICA'),
('INGENIERÍA ELECTRÓNICA'),
('INGENIERÍA INDUSTRIAL'),
('INGENIERÍA BIOQUÍMICA'),
('INGENIERÍA EN MATERIALES'),
('INGENIERÍA MECATRÓNICA'),
('LICENCIATURA EN BIOLOGÍA'),
('INGENIERÍA EN GESTIÓN EMPRESARIAL'),
('INGENIERÍA EN LOGÍSTICA'),
('INGENIERÍA EN SISTEMAS AUTOMOTRICES'),
('MAESTRIA EN INGENIERIA INDUSTRIAL'),
('MAESTRIA EN INGENIERIA ELECTRICA'),
('MAESTRÍA EN INGENIERÍA ELECTRÓNICA'),
('INGENIERÍA FORESTAL'),
('INGENIERÍA EN INNOVACIÓN AGRICOLA SUSTENTABLE'),
('INGENIERÍA EN AERONÁUTICA'),
('INGENIERÍA QUÍMICA'),
('INGENIERIA EN INFORMÁTICA'),
('MAESTRIA EN TECNOLOGIAS DE INFORMACION'),
('DEPARTAMENTO DE IDIOMAS'),
('DEPARTAMENTO DE EXTRACURRICULARES'),
('ESPECIALIDAD EN SISTEMAS MICROELECTROMECANICOS'),
('INGENIERÍA AMBIENTAL');


CREATE TABLE rol_miembro_club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO miembros_club (no_control, nombre, apellido_paterno, apellido_materno,
                           sexo, correo, telefono, rango, semestre, id_especialidad,
                           id_rol_member_club, id_club)
VALUES ('LIS190012', 'Hiram Isai', 'Vera', 'Garrido', 'Masculino', 'hiram@gmail.com', '432212345', 'ninguno', '3', 1, 1, 1),
       ('LIS190212', 'Zaret Zabdiel', 'Vera', 'Garrido', 'Masculino', 'zaret@gmail.com', '432212345', 'ninguno', '5', 1, 2, 1);


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
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO actividad (nombre, modalidad, objetivo_desarrollo_s, atributo_egreso, calificacion_valor,
                       tipo_evidencia, responsable, observaciones, estatus, modelo, dominio,
                       id_habilidad_desarrollada, id_tipo_actividad, id_club, id_idioma)
VALUES ('Exponer sobre porque jugar ajedrez', 'virtual', 'Desarrollar ', 'Ninguno', '10', 'Fotos', 'Javier', 'Ninguna', 'Progreso', 'NINGUNO', 'privado', 3, 1, 1, 1);


SELECT a.id, a.nombre, a.modalidad, a.objetivo_desarrollo_s, a.atributo_egreso, a.calificacion_valor,
       a.tipo_evidencia, a.responsable, a.observaciones, a.estatus, a.modelo, a.dominio,
       habilidades.nombre AS habilidad, tipo_actividad.nombre AS tipo_actividad, clubes.name AS club, idioma.idioma AS idioma
FROM actividad a
INNER JOIN habilidades ON habilidades.id = a.id_habilidad_desarrollada
INNER JOIN tipo_actividad ON tipo_actividad.id = a.id_tipo_actividad
INNER JOIN clubes ON clubes.id = a.id_club
INNER JOIN idioma ON idioma.id = a.id_idioma
WHERE clubes.id = 1;

SELECT a.id, a.nombre, a.modalidad, a.objetivo_desarrollo_s, a.atributo_egreso, a.calificacion_valor,
       a.tipo_evidencia, a.responsable, a.observaciones, a.estatus, a.modelo, a.dominio,
       a.id_habilidad_desarrollada, a.id_tipo_actividad, a.id_club, a.id_club
FROM actividad a
WHERE a.id = 1;


CREATE TABLE `habilidades`(
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `nombre` varchar(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO habilidades (nombre)
VALUES ('Lider'), ('Comunicación'), ('Trabajo en Equipo');

CREATE TABLE `tipo_actividad`(
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `nombre` varchar(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO tipo_actividad (nombre)
VALUES ('Conferencia'), ('Curso'), ('Taller'), ('Panel'), ('Concurso'), ('Convocatoria'), ('Campaña');

CREATE TABLE `evidencia`(
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `ruta` varchar(200) NOT NULL,
  `id_actividad` int NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `idioma`(
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `idioma` varchar(20) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO idioma(idioma)
VALUES ('Español'), ('Ingles'), ('Franses');

CREATE TABLE `incidencias`(
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `motivo` varchar(250) NOT NULL,
  `fecha` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `id_actividad` int NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;