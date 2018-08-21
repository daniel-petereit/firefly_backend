
const PicturesService = require('../model/PicturesService');

const getUrlArray = (req, res, next) => {
  PicturesService.getRecentUploads()
    .then((dbResponse) => {
      res.send({keys: dbResponse.map(pictureObj => pictureObj.s3key)});
    })
}


module.exports = {
  getUrlArray
}
