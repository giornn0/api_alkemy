import express from "express"

import db from "../models/index.js";
import peliculasRouter from "./peliculas.routes.js"
import personajesRouter from "./personajes.routes.js"
import {login,register} from "../controllers/user.controller.js"
import {authenticated, validData} from "../middlewares/authUser.js"
const router = express.Router()

router.post("/auth/login",validData, async(req, res, next)=>{
  try {
    const result = await login(req.body)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})
router.post("/auth/register",validData,async(req, res, next)=>{
  try {
    const result = await register(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})


router.use("/movies",peliculasRouter)
router.use("/characters",personajesRouter)

export default router