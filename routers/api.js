const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const { TOKEN_SECRET } = process.env
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3-transform')
const fs = require('fs')
const app = express()
const addRequestId = require('express-request-id')();
const sharp = require('sharp');
const PicturesService = require('../model/PicturesService');
const escape = require('escape-html');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json({limit: '5mb'}));
router.use(addRequestId);

//signup Route
router.get('/test', (req, res) => {
  console.log(req.body);
  res.send({data: 'hello world'})
});

//----------------------------------------------------
//---------------Image Handling-----------------------
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

function getS3Key(originalName, request_id) {
  let nameArray = originalName.split('.');
  let fileExtension = nameArray[nameArray.length-1];
  nameArray[nameArray.length-1] = request_id
  nameArray.push(fileExtension);
  let s3Key = nameArray.join('.')
  return escape(s3Key.replace(/ /g, '+'));
}

let s3 = new aws.S3();
let upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'dependopotamus',
      shouldTransform: function(req, file, cb) {
        console.log('in should transform')
        cb(null, 'something')
      },
      transforms: [{
        id:'originalName',
        key: function (req, file, cb) {
          let s3Key = getS3Key(file.originalname, req.id)
          cb(null, s3Key)
        },
        transform: function (req, file, cb) {
          cb(null, sharp().png())
        }
      },
      {
        id: 'thumbnail',
        key: function (req, file, cb) {
          let s3Key = 'tn.'+ getS3Key(file.originalname, req.id)
          cb(null, s3Key)
        },
        transform: function (req, file, cb) {
          cb(null, sharp().resize(180, 180).png())
        }
      }]
    })
})

router.post('/upload', upload.single('pic'), (req, res, next) => {
  let fileKey = req.file.transforms[0].id == "originalName" ? req.file.transforms[0].key : req.file.transforms[1].key
  PicturesService.createPicture(req.file.originalname, fileKey, null)
    .then((dbResponse) => {
      console.log("The DB Response:");
      console.log(dbResponse);
    });
  PicturesService.getRecentUploads()
    .then((dbResponse) => {
      console.log("Pictures in DB right now: ")
      console.log(dbResponse);
    })
  res.status(200).send(fileKey);
})


//----------------Dropzone---------------------------
// function onDrop(acceptedFiles, rejectedFiles){
//     onDrop: acceptedFiles => {
//       const req = router.post('/upload');
//       acceptedFiles.forEach(file => {
//         req.attach(file.name, file);
//       }),
//       req.end(callback);
//     }
// }
//----------------------------------------------------



module.exports = router;
