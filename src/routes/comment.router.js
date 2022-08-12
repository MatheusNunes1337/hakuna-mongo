const commentRouter = require('express').Router({mergeParams: true})
const CommentController = require('../app/controllers/CommentController')
const memberMiddleware = require('../app/middlewares/group/memberMiddleware')
const objectIdValidation = require('../app/validations/objectIdSchema')
const createCommentValidation = require('../app/validations/comment/createCommentSchema')
const updateCommentValidation = require('../app/validations/comment/updateCommentSchema')
const getAllCommentsValidation = require('../app/validations/comment/getAllSchema')
const { fileUpload } = require('../config/multer/fileUpload')

commentRouter.use(objectIdValidation)
commentRouter.post('/', fileUpload.array('files', 3), CommentController.create)
commentRouter.use(memberMiddleware)
commentRouter.get('/', getAllCommentsValidation, CommentController.findAll)
commentRouter.get('/:id', CommentController.findById)
commentRouter.patch('/:id', fileUpload.array('files', 3), CommentController.update)
commentRouter.delete('/:id', CommentController.delete)

module.exports = commentRouter