const express = require('express')
const router = express.Router();
const aws = require('aws-sdk')
const imagesController = require('../controller/images')

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

let s3 = new aws.S3();

router.get('/recentUploads', imagesController.getUrlArray)

router.get('/show/:picId', (req, res, next) => {
    let imgStream = s3.getObject({
      Bucket: 'dependopotamus',
      Key: req.params.picId
    }).createReadStream().on('error', function (e) {
        if(e.code === 'NoSuchKey') {
          res.status(404).send()
        } else {
          console.log(e)
          res.status(500).send()
        }
      })
    imgStream.pipe(res);
})

module.exports = router;
