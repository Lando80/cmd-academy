const Knex = require('knex')

module.exports = {
  async up(knex = Knex) {
    return knex.schema.createTable('tb_courses', (table) => {
      table.increments('id', 16).primary()
      table.string('name').notNull()
      table.string('description').notNull()
      table
        .string('url_Image')
        .notNull()
      table.integer('hours').notNull()
    })
  },

  async down(knex = Knex) {
    return knex.schema.dropTable('tb_courses')
  }
}