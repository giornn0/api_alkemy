import Sequelize from "sequelize";
import {relations}from "./relations.js"
import {personaje} from "./personaje.model.js"
import {pelicula} from "./pelicula.model.js"
import {genero} from "./genero.model.js"
import {user} from "./user.model.js"
import dotenv from "dotenv";

const sequelize = new Sequelize(process.env.DATABASE_URL);
const initial = {};

initial.Sequelize = Sequelize;
initial.sequelize = sequelize;

initial.peliculas = pelicula(sequelize)
initial.generos = genero(sequelize)
initial.personajes = personaje(sequelize)

initial.users = user(sequelize)
const db = relations(initial)

export default db