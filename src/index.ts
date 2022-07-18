import express, { Application, Request, Response } from 'express'
import * as dotenv from 'dotenv'
import routes from './routes'
import bodyParser from 'body-parser'
import errorMiddleware from './middleware/error.middleware'

//configure the dotenv to able to read from .ENV
dotenv.config()
const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
//to able to read body of request
//first we import bodyParser and use urlencoded methode and pass extended with true value
app.use(bodyParser.urlencoded({ extended: true }))
//scond we use middleware that json
app.use(bodyParser.json())

// HTTP request logger middleware
//configure the main route for the app
app.use('/api', routes)
// add routing for / path
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})

//use middleware error
app.use(errorMiddleware)

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})
export default app
