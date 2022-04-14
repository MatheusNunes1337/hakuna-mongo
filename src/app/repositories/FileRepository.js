const aws = require('aws-sdk')
const dotenv = require('dotenv')
const PostSchema = require('../schemas/PostSchema')
const CommentSchema = require('../schemas/CommentSchema')

dotenv.config()

aws.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const s3 = new aws.S3()
const BUCKET = process.env.AWS_S3_BUCKET


class FileRepository {
    async delete(key) {
        await PostSchema.findOneAndUpdate({files: key}, {$pull: {files: key}})
        await CommentSchema.findOneAndUpdate({files: key}, {$pull: {files: key}})
        
        return await s3.deleteObject({
            Bucket: BUCKET,
            Key: key
        })
        .promise()
    }

    async deleteMany(keys = []) {
        const objects = keys.map(key => ({ Key: key }));
        if(Object.keys(objects).length == 0) return 
        return await s3.deleteObjects({
            Bucket: BUCKET,
            Delete: { Objects: objects }
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