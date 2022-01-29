import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import db from "../models/index.js";

export const login = async({email,password})=>{
  const user = await db.users.findByPk(email);
  if (!user) throw Error(JSON.stringify({message:"Usuario inexistente!",statusCode:401}));
  if (!bcrypt.compareSync(password, user.password)) throw Error(JSON.stringify({message:"Contraseña errónea!",statusCode:401}));
  return await genToken(user);
}

export const register = async ({
  password,
  email,
}) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const result = await db.users.create({
    email,
    password: hash,
  });
  return await genToken(result);
};

const genToken = async ({ id, email }) => {
  let token = await jwt.sign(
    {
      id,
      email,
    },
    process.env.JWT_KEY,
    { expiresIn: "4h" })
  if (!token) throw Error("Error intendo crear token!");
  await db.users.update(
    {token},
    {where:id},
  )
  return {success:true,token}
};
