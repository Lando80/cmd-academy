import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

import routes from './routes'

dotenv.config()

const server = express()
const port = process.env.SERVER_PORT

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(morgan('dev'))

server.use(routes)

// not found
server.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// catch all
server.use((error, req, res, next) => {
  console.log(error)
  res.status(error.status || 500)
  res.json({ error: error.message })
})

server.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`)
})
