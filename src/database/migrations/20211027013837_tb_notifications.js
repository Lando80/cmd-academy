const Knex = require('knex')

module.exports = {
  async up(knex = Knex) {
    return knex.schema.createTable('tb_notifications', (table) => {
      table.increments('id', 16).primary()
      table.integer('userId').references('id')
        .inTable('tb_users').notNull()
      table.integer('likeId').references('id')
        .inTable('tb_likes').notNull()
      table.integer('commentId').references('id')
        .inTable('tb_comments').notNull()
      table.integer('connectionId').references('id')
        .inTable('tb_connections').notNull()
    })
  },

  async down(knex = Knex) {
    return knex.schema.dropTable('tb_notifications')
  }
}
