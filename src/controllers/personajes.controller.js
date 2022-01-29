import {Op} from "sequelize"
import db from "../models/index.js";

export const create = async(body,file)=>{
  const {nombre,edad,peso,historia,peliculas} = body
  const personaje = await db.personajes.create({
    nombre,edad,peso,historia,imagen:file.buffer,mymetype:file.mimetype
  })
  peliculas.forEach(pelicula=>{
    personaje.addPelicula(pelicula)
  })
  return personaje
}
export const update = async(body,file,id)=>{
  const {nombre,edad,peso,historia,peliculas} = body
  const personaje = await db.personajes.update({
    nombre,edad,peso,historia,imagen:file.buffer,mymetype:file.mimetype
  },{
    where: {id}
  })
  peliculas.forEach(pelicula=>{
    personaje.addPelicula(pelicula)
  })
  return personaje
} 

export const getAll = async ({name,movies,age})=>{
  let where = {}
  if(name)where.nombre = {[Op.like]:`%${name}%`};
  if(age)where.edad = age;
  if(movies)where['$peliculas.id$'] = movies;
  const personajes =  await db.personajes.findAll({
    where,
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
  return personajes
}
export const erase= async (id)=>{
  const result = await db.personajes.delete(id);
  return result
}