import express from "express"
import bodyParser from "body-parser"
import routes from "./routes/router.js"
import {errorHandler} from "./utils/error.handler.js"
import db from './models/index.js'

const port = process.env.PORT | 3000
const app = express()

app.use(bodyParser.json())
app.use(routes)
app.use(errorHandler)
app.listen(port,()=>{
  console.log(`Server listening on port ${port}`)
})