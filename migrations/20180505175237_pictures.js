
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pictures', table => {
    table.increments()
    table.integer('users_id')
      .references('id')
      .inTable('users')
    table.string('name')
    table.integer('albums_id')
      .references('id')
      .inTable('albums')
    table.string('s3url')
      .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pictures')
};
