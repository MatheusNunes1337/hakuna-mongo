const postRouter = require('express').Router({mergeParams: true})
const PostController = require('../app/controllers/PostController')
const memberMiddleware = require('../app/middlewares/group/memberMiddleware')

postRouter.use(memberMiddleware)
postRouter.get('/', PostController.findAll)
postRouter.get('/:id', PostController.findById)
postRouter.post('/', PostController.create)

module.exports = postRouter