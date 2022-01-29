import { Sequelize, DataTypes, Model } from 'sequelize';
class Personaje extends Model {}

export const personaje = (sequelize)=>{

  Personaje.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    historia: {
      type: DataTypes.STRING(255),
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
    modelName: 'Personaje'
  });
  return Personaje
}
export default Personaje
