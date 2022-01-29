import {Op} from "sequelize"
import db from "../models/index.js";

export const create = async(body,file)=>{
  const {titulo,fecha_creacion,calificacion,peliculas} = body
  const personaje = await db.personajes.create({
    titulo,fecha_creacion,calificacion,imagen:file.buffer,mimetype:file.mimetype
  })
  peliculas.forEach(pelicula=>{
    personaje.addPelicula(pelicula)
  })
  return personaje
}
export const update = async(body,file,id)=>{
  const {titulo,fecha_creacion,calificacion,peliculas} = body
  const personaje = await db.personajes.create({
    titulo,fecha_creacion,calificacion,imagen:file.buffer,mimetype:file.mimetype
  })
  peliculas.forEach(pelicula=>{
    personaje.addPelicula(pelicula)
  })
  return personaje
} 

export const getAll = async ({name,movies,age})=>{
  const nombre = name?{[Op.like]:`%${name}%`}:null;
  const edad = age | null;
  const personajes =  await db.personajes.findAll({
    where:{nombre,edad},
    include: [
      {
        model: db.peliculas,
        as: "peliculas",
        attributes: ["id", "titulo"],
        through: {
          attributes: [],
        },
      },
    ]
  });
  if(movies) personajes = personajes.filter(personaje=>personaje.peliculas.include(pelicula));
  return personajes
}
export const erase= async (id)=>{
  const result = await db.personajes.delete(id);
  return result
}