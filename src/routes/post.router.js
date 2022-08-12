const postRouter = require('express').Router({mergeParams: true})
const PostController = require('../app/controllers/PostController')
const memberMiddleware = require('../app/middlewares/group/memberMiddleware')
const objectIdValidation = require('../app/validations/objectIdSchema')
const createPostValidation = require('../app/validations/post/createPostSchema')
const updatePostValidation = require('../app/validations/post/updatePostSchema')
const getAllPostsValidation = require('../app/validations/post/getAllSchema')
const { fileUpload } = require('../config/multer/fileUpload')

postRouter.use(objectIdValidation)
postRouter.post('/', fileUpload.array('files', 3), PostController.create)
//postRouter.use(memberMiddleware)
postRouter.get('/', memberMiddleware, getAllPostsValidation, PostController.findAll)
postRouter.get('/:id', memberMiddleware, PostController.findById)
postRouter.patch('/:id', memberMiddleware, fileUpload.array('files', 3), PostController.update)
postRouter.delete('/:id', memberMiddleware, PostController.delete)

module.exports = postRouter