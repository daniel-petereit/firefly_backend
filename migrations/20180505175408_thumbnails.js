
exports.up = function(knex, Promise) {
  return knex.schema.createTable('thumbnails', table => {
    table.increments()
    table.integer('thumbnail_id')
      .references('id')
      .inTable('pictures')
      .notNullable()
    table.integer('width')
      .notNullable()
    table.integer('height')
      .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('thumbnails')
};
