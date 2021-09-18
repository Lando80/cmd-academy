const Knex = require('knex')
const dotenv = require('dotenv')

dotenv.config() // carrega as variaveis de ambiente da .env

module.exports = {
  async up(knex = Knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id', 16).primary()
      table.string('name').notNull()
      table.string('email').notNull().unique()
      table.string('password').notNull()
      table
        .string('url_Avatar')
        .notNull()
        .defaultTo(process.env.URL_USER_PLACEHOLDER)
      table.boolean('isAdmin').notNull().defaultTo(false)
      table.string('profession')
      table.string('bio')
    })
  },

  async down(knex = Knex) {
    return knex.schema.dropTable('users')
  },
}
