const AWS = require('aws-sdk');
require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const { ValidationError } = require("../exceptions/index.exception");

const s3 = new AWS.S3();

s3.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION, // 사용자 사용 지역 (서울의 경우 ap-northeast-2)

});

const deleteImage = async function (imageName) {
    try {
        console.log(imageName);
        await s3.deleteObject({
            Bucket: process.env.BUCKET,
            Key: imageName,
        },(err,data)=>{
        });
    }catch (error){
        return new ValidationError("이미지 파일을 삭제하지 못했습니다.","ImageDeleteError",400);
    }
}

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET,
        acl: 'public-read-write',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        limits: { fileSize: (1024 * 1024) * 3 },
        key: function (req, file, callback) {
            callback(null, `${Date.now()}_${file.originalname}`);
        },
    }),
});

module.exports = {upload,deleteImage};