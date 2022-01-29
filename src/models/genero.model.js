import { Sequelize, DataTypes, Model } from "sequelize";
class Genero extends Model {}

export const genero = (sequelize) =>{
  Genero.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Genero",
    }
  );
  return Genero
}