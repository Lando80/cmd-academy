import express from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import PostController from './app/controllers/PostController'
import AuthMiddleware from './app/middlewares/authentication'

const routes = express.Router()

<<<<<<< HEAD
routes.post('/users', UserController.save)
routes.post('/auth', SessionController.signin)

// Authentication middleware
routes.use(AuthMiddleware)

routes.put('/users/:id', UserController.save)

// Posts routes
routes.post('/posts', PostController.save)
routes.put('/posts/:post_id', PostController.update)
routes.delete('/posts/:post_id', PostController.delete)

routes.get('/posts/:post_id', PostController.show)
routes.get('/:user_id/posts', PostController.indexAll)
routes.get('/feed', PostController.index)
=======
routes.post('/signup', UserController.save)
routes.post('/signin', SessionController.signin)

routes.use(AuthMiddleware)

routes.put('/users', UserController.update)
>>>>>>> login-cadastro

export default routes
