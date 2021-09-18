import bcrypt from 'bcrypt'
import knex from '../../database/connection'

class UserController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body

      const searchEmail = await knex
        .select('*')
        .from('users')
        .where('email', email)

      if (searchEmail.length === 1) {
        return res
          .status(409)
          .send({ mensagem: 'O e-mail informado já está cadastro' })
      }

      await knex('users').insert({
        name,
        email,
        password,
      })

      return res
        .status(201)
        .send({ mensagem: 'Usuário cadastrado com sucesso' })
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}

export default new UserController()
