const commentRouter = require('express').Router({mergeParams: true})
const CommentController = require('../app/controllers/CommentController')
const memberMiddleware = require('../app/middlewares/group/memberMiddleware')
const objectIdValidation = require('../app/validations/objectIdSchema')

commentRouter.use(objectIdValidation)
commentRouter.use(memberMiddleware)
commentRouter.get('/', CommentController.findAll)

module.exports = commentRouter