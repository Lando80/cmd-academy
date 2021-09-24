const Knex = require('knex')

module.exports = {
  async up(knex = Knex) {
    return knex.schema.createTable('posts', (table) => {
      table.increments('id').primary().unsigned()
      table.string('title').notNull()
      table.text('content').notNull()
      table.string('tags')
      table.string('url_image')

      table.timestamp(true, true)

      table.integer('author_id').references('id').inTable('users')
    })
  },

  async down(knex = Knex) {
    return knex.schema.dropTable('posts')
  },
}
