import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import routes from './routes'

dotenv.config()

const server = express()
const port = process.env.SERVER_PORT

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`)
})
