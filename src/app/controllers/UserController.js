import bcrypt from 'bcrypt-nodejs'
import knex from '../../database/connection'
import { existsOrError, notExistsOrError, equalsOrError } from '../utils/validations.js'

const encryptPassword = password => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

class UserController {
 
  async save(req, res) {
    
      const user = {...req.body}
      if(req.params.id) user.id = req.params.id

      try {
        existsOrError(user.name, 'Nome não informado')
        existsOrError(user.email, 'E-mail não informado')
        existsOrError(user.password, 'Senha não informada')
        existsOrError(user.confirmPassword, 'Confirmação de Senha Inválida')
        equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

      const userFromDB = await knex
        .select('*')
        .from('users')
        .where({ email: user.email }).first()

        if (!user.id){
          notExistsOrError(userFromDB, 'Usuário já cadastrado')
        }
      } catch(msg) {
        return res.status(400).send(msg)
      }

      user.password = encryptPassword(req.password)
      delete user.confirmPassword

      if(user.id) {
        knex('users').update(user)
        .where({ id: user.id })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
      } else {
        knex('users').insert(user)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
      }
    }
  }

export default new UserController()