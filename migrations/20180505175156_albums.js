
exports.up = function(knex, Promise) {
  return knex.schema.createTable('albums', table => {
    table.increments()
    table.string('name')
      .notNullable()
    table.integer('users_id')
      .references('id')
      .inTable('users')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('albums')
};
