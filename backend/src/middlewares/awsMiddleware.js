const AWS = require('aws-sdk');
require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3();

s3.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION, // 사용자 사용 지역 (서울의 경우 ap-northeast-2)

});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET,
        acl: 'public-read-write',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, callback) {
            callback(null, `${Date.now()}_${file.originalname}`);
        },
    }),
});

module.exports = upload;