
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pictures').del()
    .then(function () {
      // Inserts seed entries
      return knex('pictures').insert([
        {id: 1, users_id: '', name: '', albums_id: '', s3key: ''}

      ]);
    });
};
