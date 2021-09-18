const path = require('path')
const config = require('./src/config/database')

module.exports = {
  client: 'pg',
  connection: config.DATABASE,
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  useNullAsDefault: true,
}
