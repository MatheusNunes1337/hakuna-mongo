const postRouter = require('express').Router({mergeParams: true})
const PostController = require('../app/controllers/PostController')
const memberMiddleware = require('../app/middlewares/group/memberMiddleware')
const objectIdValidation = require('../app/validations/objectIdSchema')
const createPostValidation = require('../app/validations/post/createPostSchema')
const updatePostValidation = require('../app/validations/post/updatePostSchema')
const getAllPostsValidation = require('../app/validations/post/getAllSchema')
const { fileUpload } = require('../config/multer/fileUpload')

postRouter.use(objectIdValidation)
postRouter.use(memberMiddleware)
postRouter.get('/', getAllPostsValidation, PostController.findAll)
postRouter.get('/:id', PostController.findById)
postRouter.post('/', fileUpload.array('files', 3), PostController.create)
postRouter.patch('/:id', fileUpload.array('files', 3), PostController.update)
postRouter.delete('/:id', PostController.delete)

module.exports = postRouter