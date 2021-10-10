const Knex = require('knex')
const dotenv = require('dotenv')
const tableName = 'tb_users'

dotenv.config() // carrega as variaveis de ambiente da .env

module.exports = {
  async up(knex = Knex) {
    return knex.schema.createTable(tableName, (table) => {
      table.increments('id', 16).primary()
      table.string('name').notNull()
      table.string('email').notNull().unique()
      table.string('password').notNull()
      table.string('type', 9).notNull().defaultTo('Aluno')
      table.string('profession')
      table.string('bio')
      table
        .string('url_avatar')
        .notNull()
        .defaultTo(process.env.URL_USER_PLACEHOLDER)
    })
  },

  async down(knex = Knex) {
    return knex.schema.dropTable(tableName)
  },
}
