const Knex = require('knex')

module.exports = {
  async up(knex = Knex) {
    return knex.schema.createTable('tb_connections', (table) => {
      table.increments('id', 16).primary()
      table.timestamp('createdAt')
      table.boolean('status_connections').notNull().defaultTo(false)
      table.integer('usereq').notNull()
      table.integer('useresp').notNull()
    })
  },

  async down(knex = Knex) {
    return knex.schema.dropTable('tb_connections')
  }
}