CREATE SCHEMA testing_alkemy;
use testing_alkemy ;
CREATE TABLE Personajes (
	id BIGINT AUTO_INCREMENT UNIQUE KEY,
	nombre VARCHAR(50) NOT NULL,
	edad INT NOT NULL,
	peso FLOAT NOT NULL,
	historia VARCHAR(255) NOT NULL,
    imagen LONGBLOB NOT NULL,
    mymetype VARCHAR(50)NOT NULL,
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW()
);
CREATE TABLE Peliculas (
	id BIGINT AUTO_INCREMENT UNIQUE KEY,
	titulo VARCHAR(50) NOT NULL,
	fecha_creacion DATE NOT NULL,
	calificacion FLOAT NOT NULL,
    imagen LONGBLOB NOT NULL,
    mymetype VARCHAR(50)NOT NULL,
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW()
);
CREATE TABLE Generos (
	id BIGINT AUTO_INCREMENT UNIQUE KEY,
	nombre VARCHAR(50) NOT NULL,
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW()
);
CREATE TABLE genero_pelicula (
	pelicula_id BIGINT NOT NULL,
	genero_id BIGINT NOT NULL,
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
	FOREIGN KEY(pelicula_id) REFERENCES Peliculas(id)ON DELETE CASCADE,
	FOREIGN KEY(genero_id) REFERENCES Generos(id)ON DELETE CASCADE
);
CREATE TABLE pelicula_personaje (
	pelicula_id BIGINT NOT NULL,
	personaje_id BIGINT NOT NULL,
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
	FOREIGN KEY(pelicula_id) REFERENCES Peliculas(id)ON DELETE CASCADE,
	FOREIGN KEY(personaje_id) REFERENCES Personajes(id)ON DELETE CASCADE
);
CREATE TABLE Users (
	id BIGINT AUTO_INCREMENT UNIQUE KEY,
	email VARCHAR (255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	token VARCHAR(255),	
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
    CONSTRAINT email_unique UNIQUE (email)
);
ALTER TABLE Users ADD CONSTRAINT email_unique UNIQUE (email);
INSERT INTO Generos (nombre) VALUES("Acción"),("Aventuras"),("Ciencia Ficción"),("Comedia"),("No-Ficción/Documental"),("Drama"),("Fantasía"),("Musical"),("Suspense"),("Terror"),("Cine Mudo"),("Cinema sonoro"),("Cine 2D"),("Películas 3D"),("Animación"),("Religiosas"),("Futuristas"),("Policíacas"),("Crimen"),("Bélicas"),("Históricas"),("Deportivas"),("Western");

SELECT * FROM Peliculas p ;
DELETE FROM Users ;

DROP SCHEMA testing_alkemy ;