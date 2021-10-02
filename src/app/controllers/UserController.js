import bcrypt from 'bcrypt'
import knex from '../../database/connection'
import { existsOrError, notExistsOrError, equalsOrError } from '../utils/validations.js'

const hashedPassword = password => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
} 

class UserController {
 
  async save(req, res) {
    
    const user = {...req.body}
  
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

    user.password = hashedPassword(user.password)
    delete user.confirmPassword

      
    knex('users').insert(user)
    .then(_ => res.status(204).send())
    .catch(err => res.status(500).send(err))
  }

  async update(req, res) {

    const { name, email, url_Avatar, profession, bio} = req.body

    existsOrError(name, 'Nome não informado')
    existsOrError(email, 'E-mail não informado')

    const user = await knex
    .select('*')
    .from('users')
    .where({ id: req.userId }).first()

    if(user.id){
      existsOrError(user, 'Usuário não encontrado.')
    } 

    user.name = name
    user.email = email
    user.url_Avatar = url_Avatar
    user.profession = profession
    user.bio = bio

    knex('users').update(user)
    .where({ id: req.userId })
    .then(_ => res.status(204).send())
    .catch(err => res.status(500).send(err))
  }

  async all(req, res) {

    try {
      
      //Pega informações(exceto a senha) de todos usuarios no banco 
      const userFromDB = await knex
        .select('id', 'name', 'email', 'bio', 'url_Avatar', 'isAdmin', 'profession')
        .from('users')

      //Retorna todas as informações
      return res.status(200).send(userFromDB)


      } catch(msg) {
        return res.status(400).send(msg)
      }
  }

  async one(req, res) {

    try {
      
      //Pega informções enviadas no post
      const user = {...req.body}

      //Verifica se o id foi informado
      existsOrError(user.id, 'Id não informado')

      //Pega informações(exceto a senha) do usuario no banco de acordo com o id recebido 
      const userFromDB = await knex
        .select('id', 'name', 'email', 'bio', 'url_Avatar', 'isAdmin', 'profession')
        .from('users')
        .where({ id: user.id }).first()

      //Retorna as informações
      return res.status(200).send(userFromDB)


      } catch(msg) {
        return res.status(400).send(msg)
      }
  }
}
  
export default new UserController()