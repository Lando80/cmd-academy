const Knex = require('knex')
const dotenv = require('dotenv')

dotenv.config() // carrega as variaveis de ambiente da .env

module.exports = {
  async up(knex = Knex) {
    return knex.schema.createTable('tb_publication', (table) => {
      table.increments('id', 16).primary()
      table.string('title').notNull()
      table.string('contents').notNull()
      table.string('tag')
      table
        .string('url_Image')
        .notNull()
      table.timestamp('createdAt')
      table.integer('userId').references('id')
        .inTable('tb_users').notNull()
    })
  },

  async down(knex = Knex) {
    return knex.schema.dropTable('tb_publication')
  }
}