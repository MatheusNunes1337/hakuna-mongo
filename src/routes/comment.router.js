const commentRouter = require('express').Router({mergeParams: true})
const CommentController = require('../app/controllers/CommentController')
const memberMiddleware = require('../app/middlewares/group/memberMiddleware')
const objectIdValidation = require('../app/validations/objectIdSchema')
const createCommentValidation = require('../app/validations/comment/createCommentSchema')
const updateCommentValidation = require('../app/validations/comment/updateCommentSchema')
const getAllCommentsValidation = require('../app/validations/comment/getAllSchema')

commentRouter.use(objectIdValidation)
commentRouter.use(memberMiddleware)
commentRouter.get('/', getAllCommentsValidation, CommentController.findAll)
commentRouter.get('/:id', CommentController.findById)
commentRouter.post('/', createCommentValidation, CommentController.create)
commentRouter.patch('/:id', updateCommentValidation, CommentController.update)
commentRouter.delete('/:id', CommentController.delete)

module.exports = commentRouter