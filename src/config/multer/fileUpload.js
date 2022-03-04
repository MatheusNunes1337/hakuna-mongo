const multer = require("multer");
const path = require('path')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const dotenv = require('dotenv')
const BadRequest = require('../../app/errors/BadRequest')

dotenv.config()

aws.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const fileStorageLocal = multer.diskStorage({    
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    }, 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
            + path.extname(file.originalname))
    }
});

const fileStorageS3 = multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
        + path.extname(file.originalname)) 
    }
    
})

const imageUpload = multer({
    storage: fileStorageS3,
    limits: {
      fileSize: 3000000 
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|PNG)$/)) { 
         return cb(new BadRequest('Only images are accepted!'))
        }
        cb(undefined, true)
    }
})

const fileUpload = multer({
    storage: fileStorageS3,
    limits: {
      fileSize: 3000000 
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|PNG|pdf|docx|odt|txt|js|php)$/)) { 
         return cb(new BadRequest('Invalid file format!'))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload, fileUpload }

