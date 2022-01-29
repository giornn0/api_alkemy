import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import db from "../models/index.js";
import {validate} from "./validateFn.js"
import { body } from 'express-validator';

if(process.env.PRODUCTION)dotenv.config()
export const authenticated = async (req,res,next)=>{
  try {
    const token = req.headers.authorization.replace("Bearer ","")
    const valid = await jwt.verify(token,process.env.JWT_KEY)
    if(!valid) return res.status(401).json({message:"Error intentando logear!"})
    const user = await db.users.findOne({
      where:{
          token
        }
    })
    if(!user) return res.status(401).json({message:"Error intentando ingresar!"})
    const {id,tipo} = user
    req.user = {
      id,
      tipo
    }
    next()
  } catch (error) {
    next(error)
  }
}

export const validData = validate([
  body('email').isEmail(),
  body('password').isLength({ min: 6 ,max:30}),
])
