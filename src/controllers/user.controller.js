import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

import db from "../models/index.js";

if (!process.env.PRODUCTION) dotenv.config();
export const login = async ({ email, password }) => {
  const user = await db.users.findOne({where:{email}});
  if (!user)
    throw Error(
      JSON.stringify({ message: "Usuario inexistente!", statusCode: 401 })
    );
  if (!bcrypt.compareSync(password, user.password))
    throw Error(
      JSON.stringify({ message: "Contraseña errónea!", statusCode: 401 })
    );
  return await genToken(user);
};

export const register = async ({ password, email }) => {
  const Client = sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "shaaamsuu@hotmail.com",
    subject: "Bienvenido al test!",
    text: "Espero sea de su agrado la aplicación. Fue Realizada en una maraton de un día!",
    html: '<a href="https://giornn0.github.io/portfolio/" target="_blank"><strong>Ali Rigol - Portfolio</strong></a>',
  };
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const [validEmail, result] = await Promise.allSettled([
    await Client.send(msg),
    await db.users.create({
      email,
      password: hash,
    }),
  ]);
  return await genToken(result.value);
};

const genToken = async ({ id, email }) => {
  let token = await jwt.sign(
    {
      id,
      email, 
    },
    process.env.JWT_KEY,
    { expiresIn: "4h" }
  );
  if (!token) throw Error("Error intendo crear token!");
  await db.users.update({ token },{
    where: {id}
  });
  return { success: true, token };
};
