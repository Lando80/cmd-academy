const dotenv = require('dotenv')

dotenv.config() // Carregando variaveis de ambiente

const config = {
  DATABASE: {
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_NAME,
  },
}

module.exports = config
