
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('thumbnails').del()
    .then(function () {
      // Inserts seed entries
      return knex('thumbnails').insert([
        {id: 1, thumbnail_id: '', width: '', height: ''}
        
      ]);
    });
};
