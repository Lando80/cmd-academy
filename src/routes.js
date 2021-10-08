import express from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import AuthMiddleware from './app/middlewares/authentication'

const routes = express.Router()

routes.post('/signup', UserController.save)
routes.post('/signin', SessionController.signin)

routes.get('/count', UserController.countUsers)

routes.use(AuthMiddleware)

routes.put('/users', UserController.update)
routes.get('/users', UserController.get)
routes.get('/users/:id', UserController.getById)



export default routes
