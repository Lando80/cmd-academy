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
  async save(req, res) {
    const user = { ...req.body }

    try {
      existsOrError(user.name, 'Nome não informado')
      existsOrError(user.email, 'E-mail não informado')
      existsOrError(user.password, 'Senha não informada')
      existsOrError(user.confirmPassword, 'Confirmação de Senha Inválida')
      equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

      const userFromDB = await knex
        .select('*')
        .from('users')
        .where({ email: user.email })
        .first()

      if (!user.id) {
        notExistsOrError(userFromDB, 'Usuário já cadastrado')
      }
    } catch (msg) {
      return res.status(400).send(msg)
    }

    user.password = hashedPassword(user.password)
    delete user.confirmPassword

    knex('users')
      .insert(user)
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err))
  }

  async update(req, res) {
    const { name, email, url_Avatar, profession, bio } = req.body

    existsOrError(name, 'Nome não informado')
    existsOrError(email, 'E-mail não informado')

    const user = await knex
      .select('*')
      .from('users')
      .where({ id: req.userId })
      .first()

    if (user.id) {
      existsOrError(user, 'Usuário não encontrado.')
    }

    user.name = name
    user.email = email
    user.url_Avatar = url_Avatar
    user.profession = profession
    user.bio = bio

    knex('users')
      .update(user)
      .where({ id: req.userId })
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err))
  }

  async get(req, res) {
    try {
      const usersFromDB = await knex
        .select('id', 'name', 'email', 'url_Avatar', 'profession', 'bio')
        .from('users')

      return res.status(200).json(usersFromDB)
    } catch (msg) {
      return res.status(400).json({ error: msg })
    }
  }

  async getById(req, res) {
    try {
      const userFromDB = await knex
        .select('id', 'name', 'email', 'url_Avatar', 'profession', 'bio')
        .from('users')
        .where({ id: req.params.id })
        .first()

      return res.status(200).json(userFromDB)
    } catch (msg) {
      return res.status(400).json({ error: msg })
    }
  }

  async countUsers(req, res) {
    try {
      const usersFromDB = await knex.count('id').from('users').first()

      return res.status(200).json(usersFromDB)
    } catch (msg) {
      return res.status(400).json({ error: msg })
    }
  }
}

export default new UserController()
