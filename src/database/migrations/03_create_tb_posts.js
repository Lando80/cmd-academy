const tableName = 'tb_posts'

exports.up = async function (knex) {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary().unsigned()
    table.string('title').notNull()
    table.text('content').notNull()
    table.string('url_image')

    table.timestamps(false, true)

    table.integer('author_id').references('id').inTable('tb_users')
  })

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `)
}

exports.down = function (knex) {
  return knex.schema.dropTable(tableName)
}
