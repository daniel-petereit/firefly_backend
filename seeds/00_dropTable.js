
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('thumbnails').del()
    .then(() => knex('pictures_albums').del()
    .then(() => knex('pictures').del())
    .then(() => knex('albums').del())
    .then(() => knex('users').del())
}
