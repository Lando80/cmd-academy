import bcrypt from 'bcrypt'
import knex from '../../database/connection'
import {
  existsOrError,
  notExistsOrError,
  equalsOrError,
} from '../utils/validations.js'

const hashedPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

class UserController {
  //TODO: FIX SAVE FUNCTION AND ADD SEARCH POSTS ROUTE && FUNCTION
  async save(req, res, next) {
    try {
      const user = { ...req.body }

      existsOrError(user.name, 'Nome não informado')
      existsOrError(user.email, 'E-mail não informado')
      existsOrError(user.password, 'Senha não informada')
      existsOrError(user.confirmPassword, 'Confirmação de Senha Inválida')
      equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

      const userFromDB = await knex('users')
        .where({ email: user.email })
        .first()

      if (!user.id) {
        notExistsOrError(userFromDB, 'Usuário já cadastrado.')
      }

      user.password = hashedPassword(user.password)
      delete user.confirmPassword

      delete user.password

      return res
        .status(201)
        .json({ message: 'Usuário cadastrado com sucesso.' })
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const { name, profession, bio } = req.body

      const { firebaseUrl } = req.file ? req.file : ''

      const user = await knex('users').where({ id: req.params.user_id }).first()

      if (!user) return res.status(404).json({ error: 'User not found.' })

      if (req.userId != req.params.user_id)
        return res
          .status(403)
          .json({ error: 'Não é possível alterar o perfil de outro usuário.' })

      user.name = name || user.name
      user.url_Avatar = firebaseUrl || user.url_Avatar
      user.profession = profession || user.profession
      user.bio = bio || user.bio

      await knex('users').update(user).where({ id: req.userId })

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
