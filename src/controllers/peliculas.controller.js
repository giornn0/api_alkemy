import {Op} from "sequelize"
import db from "../models/index.js";

export const create = async(body,file)=>{
  const {titulo,fecha_creacion,calificacion,generos} = body
  if(calificacion<0 || calificacion>5) return res.status(403).json({message:"Verifique la informacion enviada!"})
  const pelicula = await db.peliculas.create({
    titulo,fecha_creacion,calificacion,imagen:file.buffer,mimetype:file.mimetype
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
    titulo,fecha_creacion,calificacion,imagen:file.buffer,mimetype:file.mimetype
  },{
    where: id
  })
  generos.forEach(genre=>{
    pelicula.addGenero(genre)
  })
  return pelicula
} 

export const getAll = async ({name,genre,order})=>{
  const titulo = name?{[Op.like]:`%${name}%`}:null;
  const orderQuery = order?['fecha_creacion',`${order}`]:null;
  const peliculas =  await db.peliculas.findAll({
    where:{titulo},
    order:orderQuery,
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
  if(genre) peliculas = peliculas.filter(pelicula=>pelicula.generos.include(genre));
  return peliculas
}
export const erase= async (id)=>{
  const result = await db.peliculas.delete(id);
  return result
}