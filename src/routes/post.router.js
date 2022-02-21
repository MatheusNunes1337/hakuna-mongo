const postRouter = require('express').Router({mergeParams: true})
const PostController = require('../app/controllers/PostController')
const memberMiddleware = require('../app/middlewares/group/memberMiddleware')
const objectIdValidation = require('../app/validations/objectIdSchema')

postRouter.use(objectIdValidation)
postRouter.use(memberMiddleware)
postRouter.get('/', PostController.findAll)
postRouter.get('/:id', PostController.findById)
postRouter.post('/', PostController.create)
postRouter.patch('/:id', PostController.update)

module.exports = postRouter