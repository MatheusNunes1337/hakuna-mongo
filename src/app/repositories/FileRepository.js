const aws = require('aws-sdk')
const dotenv = require('dotenv')

dotenv.config()
const s3 = new aws.S3()
const BUCKET = process.env.AWS_S3_BUCKET

class FileRepository {
    async delete(key) {
        return await s3.deleteObject({
            Bucket: BUCKET,
            Key: key
        })
        .promise()
    }

    async download(key) {
        const file = await s3.getObject({
            Bucket: BUCKET,
            Key: key
        })
        .promise()

        return file.Body
    }
}

module.exports = new FileRepository()