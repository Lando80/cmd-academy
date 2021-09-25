import express from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import AuthMiddleware from './app/middlewares/authentication'

const routes = express.Router()

routes.post('/signup', UserController.save)
routes.post('/signin', SessionController.signin)

routes.use(AuthMiddleware)

routes.put('/users', UserController.update)

export default routes
