
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pictures_albums', table => {
    table.increments()
    table.integer('picture_id')
      .references('id')
      .inTable('pictures')
    table.integer('album_id')
      .references('id')
      .inTable('albums')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pictures_albums')
};
