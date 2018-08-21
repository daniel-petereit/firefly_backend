
exports.up = function(knex, Promise) {
  return knex.schema.table('pictures', table => {
    table.renameColumn('s3url', 's3key')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('pictures', table => {
    table.renameColumn('s3key', 's3url')
  })
};
