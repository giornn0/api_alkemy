import {Op} from "sequelize"
import db from "../models/index.js";

export const create = async(body,file)=>{
  const {titulo,fecha_creacion,calificacion,generos} = body
  if(calificacion<0 || calificacion>5) return res.status(403).json({message:"Verifique la informacion enviada!"})
  const pelicula = await db.peliculas.create({
    titulo,fecha_creacion,calificacion,imagen:file.buffer,mymetype:file.mimetype
  })
  generos.forEach(genre=>{
    pelicula.addGenero(genre)
  })
  return pelicula
}
export const update = async(body,file,id)=>{
  const {titulo,fecha_creacion,calificacion,generos} = body
  if(calificacion<0 || calificacion>5) return res.status(403).json({message:"Verifique la informacion enviada!"})
  const pelicula = await db.peliculas.update({
    titulo,fecha_creacion,calificacion,imagen:file.buffer,mymetype:file.mimetype
  },{
    where: {id}
  })
  generos.forEach(genre=>{
    pelicula.addGenero(genre)
  })
  return pelicula
} 

export const getAll = async ({name,genre,order})=>{
  let where = {}
  let ordArray = []
  if (name)where.titulo = {[Op.like]:`%${name}%`}
  if (order)ordArray.push(['fecha_creacion',`${order}`])
  if (genre)where['$generos.id$'] = genre
  const peliculas =  await db.peliculas.findAll({
    where,
    order:ordArray,
    include: [
      {
        model: db.generos,
        as: "generos",
        attributes: ["id", "nombre"],
        through: {
          attributes: [],
        },
      },
      {
        model: db.personajes,
        as: "personajes",
        attributes: ["id", "nombre"],
        through: {
          attributes: [],
        },
      },
    ]
  });
  return peliculas
}
export const erase= async (id)=>{
  const result = await db.peliculas.delete(id);
  return result
}