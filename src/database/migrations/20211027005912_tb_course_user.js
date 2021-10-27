const Knex = require('knex')

module.exports = {
  async up(knex = Knex) {
    return knex.schema.createTable('tb_course_user', (table) => {
      table.increments('id', 16).primary()
      table.integer('userId').references('id')
        .inTable('tb_users').notNull()
      table.integer('courseId').references('id')
        .inTable('tb_courses').notNull()
    })
  },

  async down(knex = Knex) {
    return knex.schema.dropTable('tb_course_user')
  }
}