const tableName = 'tb_likes'

exports.up = async function (knex) {
  await knex.schema.createTable(tableName, (table) => {
    table.boolean('is_active').notNull().defaultTo(true)
    table.timestamps(false, true)

    table.integer('user_id').references('id').inTable('tb_users')
    table.integer('post_id').references('id').inTable('tb_posts')
    table.primary(['post_id', 'user_id'])
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
