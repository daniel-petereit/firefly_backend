
const UsersService = require('../model/UsersService');
const jwt = require('jsonwebtoken');
const { jwtSignAsync } = require('../utils/jsonwebTokenAsync');
const SECRET = process.env.TOKEN_SECRET;

const createUser = (req, res, next) => {
  let {username, email, password} = req.body

  if(!username || !email || !password){
    return res.status(401).json({message: "Username, Email, and Password required"})
  }

  UsersService.getUser(username)
    .then((user) => {
      console.log(username, email, password);
      if(user){
        return res.status(400).json({message: "Username already exists"})
      } else {
        return UsersService.getEmail(email)
      }
    }).then((user) => {
      if(user){
        return res.status(400).json({message: "Email already exists"})
      } else {
        return UsersService.createUser(username, email, password)
      }
    }).then((newUser) => {
      return res.status(200).json({message: "New Account created"})
    }).catch(console.error);
}
//----------------------------------------------------------------------------


const loginUser = (req, res, next) => {

  let password = req.body.password
  let userInfo = req.body.userInfo
  let userId;

  if(!userInfo) {
    return res.status(401).json({message: "Username or Email required"})
  }

  if(!password){
    return res.status(401).json({message: "Password required"})
  }

  UsersService.getUserInfo(userInfo)
    .then((user) => {
      userId = user.id
      return UsersService.tryLoginUser(user.username, password)
    })
    .then(() => {
      let payload = {
        loggedIn: true,
        sub: {
          id: userId
        },
        exp: parseInt(Date.now() + 100000, 10)
      }
      console.log(SECRET);
      return jwtSignAsync(payload, SECRET)
    })
    .then((token) => {
      if(!token){
        res.status(403).json({message: 'No Token'})
      } else {
        return res.set('Authorization', `Bearer: ${token}`).send('Successfully Logged In');
      }
    })
    .catch(console.error)
}



module.exports = {
  createUser,
  loginUser
}
