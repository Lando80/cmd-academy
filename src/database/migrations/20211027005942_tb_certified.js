const Knex = require('knex')

module.exports = {
  async up(knex = Knex) {
    return knex.schema.createTable('tb_certified', (table) => {
      table.increments('id', 16).primary()
      table
        .string('url_Image')
        .notNull()
      table.timestamp('date_hours').notNull()
      table.integer('cuId').references('id')
        .inTable('tb_course_user').notNull()
    })
  },

  async down(knex = Knex) {
    return knex.schema.dropTable('tb_certified')
  }
}