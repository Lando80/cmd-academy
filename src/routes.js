import express from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import AuthMiddleware from './app/middlewares/authentication'

const routes = express.Router()

routes.post('/users', UserController.save)
routes.post('/auth', SessionController.signin)
routes.put('/users/:id', AuthMiddleware, UserController.save)

export default routes
