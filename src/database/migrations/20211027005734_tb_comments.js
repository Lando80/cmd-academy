const Knex = require('knex')

module.exports = {
  async up(knex = Knex) {
    return knex.schema.createTable('tb_comments', (table) => {
      table.increments('id', 16).primary()
      table.string('contents').notNull()
      table.timestamp('createdAt')
      table.integer('publicationId').references('id')
        .inTable('tb_publication').notNull()
      table.integer('userId').references('id')
        .inTable('tb_users').notNull()
    })
  },

  async down(knex = Knex) {
    return knex.schema.dropTable('tb_comments')
  }
}