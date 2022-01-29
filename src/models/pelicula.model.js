import { Sequelize, DataTypes, Model } from 'sequelize';
class Pelicula extends Model {}

export const pelicula = (sequelize) =>{
  Pelicula.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imagen: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    mymetype: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Pelicula'
  });
  return Pelicula
}
