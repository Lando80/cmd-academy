import express from 'express'
import multer from 'multer'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import PostController from './app/controllers/PostController'
import AuthMiddleware from './app/middlewares/authentication'

import uploadImage from './services/firebase'
import multerConfig from './config/multer'

const routes = express.Router()

routes.post('/users', UserController.save)
routes.post('/auth', SessionController.signin)

// Authentication middleware
routes.use(AuthMiddleware)

routes.put(
  '/users/:user_id',
  multer(multerConfig).single('avatar'),
  uploadImage,
  UserController.update
)

// Posts routes
routes.post(
  '/posts',
  multer(multerConfig).single('image'),
  uploadImage,
  PostController.save
)
routes.put('/posts/:post_id', PostController.update)
routes.delete('/posts/:post_id', PostController.delete)

routes.get('/posts/:post_id', PostController.show)
routes.get('/:user_id/posts', PostController.indexAll)
routes.get('/feed', PostController.index)

export default routes
