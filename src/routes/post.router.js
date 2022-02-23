const postRouter = require('express').Router({mergeParams: true})
const PostController = require('../app/controllers/PostController')
const memberMiddleware = require('../app/middlewares/group/memberMiddleware')
const objectIdValidation = require('../app/validations/objectIdSchema')
const createPostValidation = require('../app/validations/post/createPostSchema')
const updatePostValidation = require('../app/validations/post/updatePostSchema')
const getAllPostsValidation = require('../app/validations/post/getAllSchema')

postRouter.use(objectIdValidation)
postRouter.use(memberMiddleware)
postRouter.get('/', getAllPostsValidation, PostController.findAll)
postRouter.get('/:id', PostController.findById)
postRouter.post('/', createPostValidation, PostController.create)
postRouter.patch('/:id', updatePostValidation, PostController.update)
postRouter.delete('/:id', PostController.delete)

module.exports = postRouter