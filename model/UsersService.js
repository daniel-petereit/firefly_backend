
const knex = require('../knex');
const bcrypt = require('bcryptjs');

class UsersService {

  static getUrl(){
    return knex('pictures')
      .where({s3url})
  }

  static getUserInfo(info) {
    let userInfo;
    if(info.includes('.com')){
      userInfo = this.getEmail(info);
    } else {
      userInfo = info;
    }
    return this.getUser(userInfo);
  }

  static getUser(username) {
    return knex('users')
      .first()
      .where({username});
  }

  static getEmail(email) {
    return knex('users')
      .first()
      .where({email});
  }

  static createUser(username, email, password) {
    let hashedPassword = bcrypt.hashSync(password)
    return knex('users')
      .insert({username, email, password:hashedPassword})
      .returning('*')
  }

  static tryLoginUser(username, password) {
    return knex('users')
      .select('password')
      .first()
      .where({username})
      .then(queryResult => {
        if (!queryResult) return false;
        return bcrypt.compare(password, queryResult.password)
        //getting login error secretOrPrivateKey must contain a value
      });
  }
}

module.exports = UsersService;
