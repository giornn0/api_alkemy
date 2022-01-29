import express from "express";
import multer from "multer";
import {create,update,erase,getAll} from "../controllers/personajes.controller.js"
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const personajesRouter = express.Router();

personajesRouter.get(async (req, res, next) => {
  try {
    const result = await getAll(req.queryParams)
    res.status(200).json(result)
  } catch (error) {
    next(error);
  }
});
personajesRouter.post("/", upload.single("imagen"), async (req, res, next) => {
  try {
    const result = await create(req.body,req.file)
    res.status(201).json(result)
  } catch (error) {
    next(error);
  }
});
personajesRouter.put("/:id", upload.single("imagen"), async (req, res, next) => {
  try {
    const result = await update(req.body,req.file,req.params.id)
    res.status(202).json(result)
  } catch (error) {
    next(error);
  }
});
personajesRouter.delete("/:id", async (req, res, next) => {
  try {
    const result = await erase(req.params.id)
    res.status(200).json({message:"Personaje eliminado con éxito!!"})
  } catch (error) {
    next(error);
  }
});
export default personajesRouter;
