import { Sequelize, DataTypes, Model } from "sequelize";
class User extends Model {}

export const user = (sequelize) =>{
  User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique:true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      token:{
        type: DataTypes.STRING(255),
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User
}