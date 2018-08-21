
const knex = require('../knex');

class PicturesService {

  static getRecentUploads() {
    return knex.select('*').from('pictures').limit(50);
  }

  static createPicture(pictureName, s3key, userId) {
    return knex('pictures')
      .insert({users_id: userId, name: pictureName, albums_id: null, s3key: s3key})
      .returning('*');
  }

  static createAlbum(pictureName, s3Key, userId, albumName) {
    return knex('albums')
      
  }


}

module.exports = PicturesService;
