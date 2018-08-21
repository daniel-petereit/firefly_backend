
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pictures_albums').del()
    .then(function () {
      // Inserts seed entries
      return knex('pictures_albums').insert([
        {id: 1, picture_id: '', album_id: ''}

      ]);
    });
};
