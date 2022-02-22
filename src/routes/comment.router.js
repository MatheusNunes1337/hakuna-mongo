const commentRouter = require('express').Router({mergeParams: true})
const CommentController = require('../app/controllers/CommentController')
const memberMiddleware = require('../app/middlewares/group/memberMiddleware')
const objectIdValidation = require('../app/validations/objectIdSchema')

commentRouter.use(objectIdValidation)
commentRouter.use(memberMiddleware)
commentRouter.get('/', CommentController.findAll)
commentRouter.get('/:id', CommentController.findById)
commentRouter.post('/', CommentController.create)
commentRouter.patch('/:id', CommentController.update)
commentRouter.delete('/:id', CommentController.delete)

module.exports = commentRouter