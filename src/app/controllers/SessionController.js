import bcrypt from 'bcrypt'
import knex from '../../database/connection'
import { existsOrError } from '../utils/validations.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config() //Carregar configurações como "JWT_SECRET" e "JWT_EXPIRATION" do arquivo dotenv pra serem usadas no codigo

class SessionController {
  async signin(req, res, next) {
    const user = { ...req.body }

    try {
      //Verifica se atributos são nulos
      existsOrError(user.email, 'E-mail não informado')
      existsOrError(user.password, 'Senha não informada')

      //Pega informações no banco a partir do email recebido
      const userFromDB = await knex
        .select('*')
        .from('tb_users')
        .where({ email: user.email })
        .first()

      //Verifica se existe usuario para o email
      existsOrError(userFromDB, 'Usuário não cadastrado')

      //Compara a senha recebida com a senha do banco
      if (!(await bcrypt.compare(user.password, userFromDB.password))) {
        return res.status(401).send('Senha não confere')
      }

      //Chegando aqui as credenciais ja foram validadas e são retornadas informações do usuario além do token jwt para sessão
      return res.status(200).json({
        user: {
          id: userFromDB.id,
          name: userFromDB.name,
          email: userFromDB.email,
          bio: userFromDB.bio,
          avatar: userFromDB.url_Avatar,
          profession: userFromDB.profession,
        },
        token: jwt.sign({ id: userFromDB.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRATION,
        }),
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new SessionController()
