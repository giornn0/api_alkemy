export const relations = (db) => {
  db.personajes.belongsToMany(db.peliculas, {
    through: "pelicula_personaje",
    as: "peliculas",
    foreignKey: "personaje_id",
  });
  db.generos.belongsToMany(db.peliculas, {
    through: "genero_pelicula",
    foreignKey: "genero_id",
  });

  db.peliculas.belongsToMany(db.generos, {
    through: "genero_pelicula",
    as: "generos",
    foreignKey: "pelicula_id",
  });
  db.peliculas.belongsToMany(db.personajes, {
    through: "pelicula_personaje",
    as: "personajes",
    foreignKey: "pelicula_id",
  });
  return db;
};
