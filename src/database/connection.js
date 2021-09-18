import knex from 'knex'
import config from '../config/database'

const connection = knex({
  client: 'pg',
  connection: config.DATABASE,
  useNullAsDefault: true,
})

export default connection
